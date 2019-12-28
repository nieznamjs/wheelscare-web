module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrationsTableName: 'migrations',
  entities: [
    'src/modules/**/*.entity.ts',
  ],
  migrations: [
    'src/migrations/**/*.ts',
  ],
  subscribers: [
    'src/subscriber/**/*.ts',
  ],
  cli: {
    entitiesDir: 'src/modules',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscribers',
  },
};
