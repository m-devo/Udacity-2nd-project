### Storefront Backend Project
Project provided by udacity for Advanced Full-Stack Web Development Nano Degree.

## Setup Database
- Connect to the default postgeres database 
- Use the following command to create a user
`CREATE DATABASE <username> WITH PASSWORD <password>`
- Use the following command to create a database
- `CREATE DATABASE <db_dev` for main development
- `CREATE DATABAE <db_test>` for testing
- Insert your `.env` variables.
- Create `database.json file`

## Instalition Instructions
- Start the container `docker-compose`
- Install dependencies  `npm install` `yarn install`
- Start migration `db-migrate up`  
- Build the app`npm run build` 

## ENV
- add `.env` file
```
PORT=3000
ENV=dev
POSTGRES_DB=db_dev
POSTGRES_DB_TEST=db_test
POSTGRES_PASSWORD=123456789
POSTGRES_USER=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
BCRYPT_PASSWORD=password
SALT_ROUNDS=10
TOKEN_SECRET=sohard
```
## database.json
add `database.json` file in the main directory

```
{
    "dev": {
      "driver": "pg",
      "host": {"ENV" : "POSTGRES_HOST"},
      "database":{"ENV" : "POSTGRES_DB"},
      "user": {"ENV" : "POSTGRES_USER"},
      "password": {"ENV" : "POSTGRES_PASSWORD"}
    },
    "test": {
      "driver": "pg",
      "host": {"ENV" : "POSTGRES_HOST"},
      "database":{"ENV" : "POSTGRES_DB_TEST"},
      "user": {"ENV" : "POSTGRES_USER"},
      "password": {"ENV" : "POSTGRES_PASSWORD"}
    }
}
```

## Start app 
`npm run start` the app will start on server localhost:3000/

## Tests
`npm run test` run all tests

## What is used 
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs

## Testing 
- jasmine and supertest from npm for testing
- Prettier - Eslient

## References
- Udacity
- npmjs [https://www.npmjs.com/package]
- postgres tutorial [https://www.postgresqltutorial.com/]
- -Nodejs Documentation [https://nodejs.org/dist/latest-v10.x/docs/api/fs.html]
