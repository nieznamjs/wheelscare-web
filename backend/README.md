# WheelsCare API

## Requirements
- Node version defined in `.nvmrc` installed
- Docker installed
- AWS account (ask administrator for it)

## Installation
- Run `npm install` to install dependencies
- Install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv1.html)
- [Configure CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html#cli-quick-configuration) using secrets you will get from administrator
- Create `.env` file with following properties:
```
DB_HOST=localhost
DB_USERNAME=wheelscare
DB_PASSWORD=password
DB_NAME=wheelscare
DB_PORT=5432
BASIC_SECRET=supersecret
AWS_REGION=eu-west-1
CLIENT_URL=http://localhost:4200
```
- Run `docker-compose up` to setup database that will be used
- Run `npm run migration:run` to run database migrations

## Development
- Run `npm run start:dev` to start application in development mode
- Be sure to run tests and linter before creating a pull request
