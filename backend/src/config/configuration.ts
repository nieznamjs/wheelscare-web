export default () => ({
  port: Number(process.env.PORT),
  clientUrl: process.env.CLIENT_URL,
  database: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    environment: process.env.ENVIRONMENT,
  },
  mail: {
    from: 'no-reply@chat.deftcode.pl',
  },
  auth: {
    basicSecret: process.env.BASIC_SECRET,
    accountActivationTokenExpiration: 3600,
  },
});
