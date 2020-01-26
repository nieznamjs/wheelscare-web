export default () => ({
  port: Number(process.env.PORT),
  clientUrl: process.env.CLIENT_URL,
  environment: process.env.ENVIRONMENT,
  logLevel: process.env.LOG_LEVEL,
  database: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  },
  email: {
    systemEmail: process.env.SYSTEM_EMAIL,
  },
  auth: {
    basicSecret: process.env.BASIC_SECRET,
    passwordResetSecret: process.env.PASSWORD_RESET_SECRET,
    accountActivationSecret: process.env.ACCOUNT_ACTIVATION_SECRET,
    accountActivationTokenExpiration: 3600,
  },
});
