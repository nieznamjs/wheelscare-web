import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { MailService } from '@services';

import { AppModule } from '../src/app.module';
import { flushDatabase, syncDatabase } from './helpers/database-helpers';
import { seedDatabase } from './helpers/database-seed';
import { setupApplication } from './helpers/setup-app';

describe('Auth (E2E)', () => {
  let app: INestApplication;
  let mailService: MailService;

  beforeAll(async () => {
    await syncDatabase();
    await seedDatabase();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test
      .createTestingModule({
        imports: [AppModule],
      })
      .overrideProvider(MailService)
      .useValue({ send: jest.fn().mockImplementation(() => Promise.resolve()) })
      .compile();

    app = moduleFixture.createNestApplication();

    setupApplication(app);

    mailService = moduleFixture.get(MailService);
    await app.init();
  });

  describe('registering user', () => {
    it('should register user', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/register')
        .send({ email: 'test@example.pl', password: 'someStrongPassWord' })
        .expect(201);

      expect(res.body.email).toBe('test@example.pl');
      expect(res.body.password).toBeUndefined();
      expect(res.body.active).toBeFalsy();
      expect(mailService.send).toBeCalled();
    });

    it('should fail if user email already exists', async () => {
       await request(app.getHttpServer())
        .post('/auth/register')
        .send({ email: 'teste@example.pl', password: 'someStrongPassWord' });

       const res = await request(app.getHttpServer())
        .post('/auth/register')
        .send({ email: 'teste@example.pl', password: 'someStrongPassWord' })
        .expect(409);

       expect(res.body.statusCode).toBe(409);
       expect(res.body.message).toBe('User already exists');
    });

    // it('should fail if password is too weak');
  });

  describe('login', () => {
    it('should login', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'dummy@dummy.com', password: 'someStrongPassWord' })
        .expect(200);

      expect(res.body.success).toBeTruthy();
      expect(res.header['set-cookie']).toBeDefined();
      expect(res.header['set-cookie'].some((cookie: string) => cookie.startsWith('authToken')));
    });

    it('should fail if password is wrong', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'dummy@dummy.com', password: 'someStrong' })
        .expect(401);

      expect(res.body.statusCode).toBe(401);
      expect(res.body.message).toBe('Unauthorized user');
    });

    it('should fail if email is wrong', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'dummydummy@dummy.com', password: 'someStrong' })
        .expect(401);

      expect(res.body.statusCode).toBe(401);
      expect(res.body.message).toBe('Unauthorized user');
    });

    it('should fail if email has wrong format', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: '', password: '' })
        .expect(400);

      expect(res.body.statusCode).toBe(400);
      expect(res.body.error).toBe('Bad Request');
      expect(res.body.message[0].property).toBe('email');
      expect(res.body.message[1].property).toBe('password');
    });

    it('should fail if user is not active', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'dummy2@dummy.com', password: 'someStrongPassWord' })
        .expect(403);

      expect(res.body.statusCode).toBe(403);
      expect(res.body.message).toBe('User is not active');
    });
  });

  afterEach(async () => {
    await app.close();
  });

  afterAll(async () => {
    await flushDatabase();
  });
});
