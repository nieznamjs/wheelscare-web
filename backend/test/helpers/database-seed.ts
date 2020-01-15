import { createConnection } from 'typeorm';
import { User } from '../../src/modules/users/users.entity';

export const seedDatabase =  async () => {
  const connection = await createConnection();
  const userRepository = connection.getRepository(User);

  await userRepository.save([
    userRepository.create({
      email: 'dummy@dummy.com',
      password: '$2b$12$BMEOay88LJ1MiUaQ4tfNY.0EKM.BWAsbjNnqtGt3Z7y2AYrwlY67e', // someStrongPassWord
      active: true,
    }),
    userRepository.create({
      email: 'dummy2@dummy.com',
      password: '$2b$12$BMEOay88LJ1MiUaQ4tfNY.0EKM.BWAsbjNnqtGt3Z7y2AYrwlY67e', // someStrongPassWord
      active: false,
    }),
  ]);

  await connection.close();
};
