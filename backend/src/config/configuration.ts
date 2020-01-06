export default () => ({
  port: Number(process.env.PORT),
  database: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    environment: process.env.ENVIRONMENT,
  },
  auth: {
    basicSecret: process.env.BASIC_SECRET,
  },
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY,
  },
});
