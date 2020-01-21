import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { flushDatabase, syncDatabase } from './helpers/database-helpers';
import { seedDatabase } from './helpers/database-seed';
import { setupApplication } from './helpers/setup-app';
import { User } from '../src/modules/users/users.entity';

describe('Users (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    await flushDatabase();
    await syncDatabase();
    await seedDatabase();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test
      .createTestingModule({
        imports: [AppModule],
      })
      .compile();

    app = moduleFixture.createNestApplication();

    setupApplication(app);

    await app.init();
  });

  describe('create user', () => {
    it('should create user', async () => {
      const res = await request(app.getHttpServer())
        .post('/users')
        .send({ email: 'test@example.pl', password: 'someStrongPassWord!23' })
        .expect(201);

      expect(res.body.email).toBe('test@example.pl');
      expect(res.body.password).toBeUndefined();
      expect(res.body.id).toBeDefined();
      expect(res.body.active).toBeFalsy();
    });

    it('should fail if user email already exists', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/register')
        .send({ email: 'dummy@dummy.com', password: 'someStrongPassWord!23' })
        .expect(409);

      expect(res.body.statusCode).toBe(409);
      expect(res.body.message).toBe('User already exists');
    });

    it('should fail if password is too weak', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/register')
        .send({ email: 'test12345@example.pl', password: 'som' })
        .expect(400);

      expect(res.body.statusCode).toBe(400);
      expect(res.body.error).toBe('Bad Request');
      expect(res.body.message[0].property).toBe('password');
    });

    it('should fail if there are missing properties', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'testtest@test.pl' })
        .expect(400);

      expect(res.body.statusCode).toBe(400);
      expect(res.body.error).toBe('Bad Request');
      expect(res.body.message[0].property).toBe('password');
    });
  });

  describe('get users', () => {
    it('should get users', async () => {
      const res = await request(app.getHttpServer())
        .get('/users?page=1')
        .expect(200);

      expect(res.body.data.length).toBe(3);
      expect(res.body.count).toBe(3);
      expect(res.body.data.some((user: User) => user.email === 'dummy@dummy.com'));
      expect(res.body.data.some((user: User) => user.email === 'dummy2@dummy.com'));
      expect(res.body.data.some((user: User) => user.email === 'test@example.pl'));
    });

    it('should filter users', async () => {
      const res = await request(app.getHttpServer())
        .get('/users?page=1&queries=[{"email":{"operator":"EQUAL","value":"dummy2@dummy.com"}}]')
        .expect(200);

      expect(res.body.data.length).toBe(1);
      expect(res.body.count).toBe(1);
      expect(res.body.data[0].email).toBe('dummy2@dummy.com');
    });

    it('should limit users', async () => {
      const res = await request(app.getHttpServer())
        .get('/users?pageSize=1&page=1')
        .expect(200);

      expect(res.body.data.length).toBe(1);
      expect(res.body.count).toBe(3);
      expect(res.body.data[0].email).toBe('dummy@dummy.com');

    });
  });

  describe('get single user', () => {
    it('should return single user', async () => {
      const res = await request(app.getHttpServer())
        .get('/users/6e41853d-3ee0-4609-9d38-5aadaa81c768')
        .expect(200);

      expect(res.body.id).toBe('6e41853d-3ee0-4609-9d38-5aadaa81c768');
      expect(res.body.email).toBe('dummy2@dummy.com');
    });

    it('should return 404 if user is not found', async () => {
      const res = await request(app.getHttpServer())
        .get('/users/6e41453d-3ee0-4609-9d38-5aadaa81c768')
        .expect(404);

      expect(res.body.statusCode).toBe(404);
      expect(res.body.message).toBe('User not found');
    });
  });

  describe('update user', () => {
    it('should update user', async () => {
      await request(app.getHttpServer())
        .patch('/users')
        .send({ id: '6e41853d-3ee0-4609-9d38-5aadaa81c768', email: 'dummy3@dummy.com' })
        .expect(200);

      const res = await request(app.getHttpServer())
        .get('/users/6e41853d-3ee0-4609-9d38-5aadaa81c768')
        .expect(200);

      expect(res.body.id).toBe('6e41853d-3ee0-4609-9d38-5aadaa81c768');
      expect(res.body.email).toBe('dummy3@dummy.com');
    });
  });

  describe('delete user', () => {
    it('should delete user', async () => {
      const res = await request(app.getHttpServer())
        .delete('/users/6e41853d-3ee0-4609-9d38-5aadaa81c768')
        .expect(200);

      expect(res.body.id).toBe('6e41853d-3ee0-4609-9d38-5aadaa81c768');
      expect(res.body.email).toBe('dummy3@dummy.com');

      const getRes = await request(app.getHttpServer())
        .get('/users/6e41853d-3ee0-4609-9d38-5aadaa81c768')
        .expect(404);

      expect(getRes.body.statusCode).toBe(404);
      expect(getRes.body.message).toBe('User not found');
    });
  });

  afterEach(async () => {
    await app.close();
  });

  afterAll(async () => {
    await flushDatabase();
  });
});
