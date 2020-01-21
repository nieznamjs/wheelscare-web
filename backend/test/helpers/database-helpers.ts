import { createConnection } from 'typeorm';

export const flushDatabase = async () => {
  const connection = await createConnection();

  await connection.dropDatabase();
  await connection.close();
};

export const syncDatabase = async () => {
  const connection = await createConnection();

  await connection.synchronize();
  await connection.close();
};
