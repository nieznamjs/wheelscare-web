export default () => ({
  port: Number(process.env.PORT),
  clientUrl: process.env.CLIENT_URL,
  environment: process.env.ENVIRONMENT,
  database: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  },
  email: {
    from: process.env.EMAIL,
  },
  auth: {
    basicSecret: process.env.BASIC_SECRET,
    passwordResetSecret: process.env.PASSWORD_RESET_SECRET,
    accountActivationTokenExpiration: 3600,
  },
});
