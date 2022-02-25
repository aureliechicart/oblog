# Blog API :pencil2:

## Introduction

Simplistic API for a blog with posts and categories.
REST API on branch master (CRUD routes for post entity).
Same API served as GraphQL on [GraphQL branch](https://github.com/aureliechicart/oblog/tree/graphql).

## Learning goals

### Database

- Database modeling: project [MCD/MLD](design)
- Database versioning: setting up a sqitch project and adding migrations to create tables
- Seeding: importing data from json files using a [script](/data/import.js)
- Using [CREATE VIEW](migrations/deploy/better_post.sql) sql command

### Architecture

- creating Express app
- creating Active Record models
- creating controllers

### Swagger API Documentation

- Documenting router and models using [JSDoc syntax](https://jsdoc.app/)
- Generating API Swagger documentation based on JSDoc code

Data validation with Joi

### Data validation using Joi

- Setting up a Joi schema to describe the expected criteria for the creation of a new blog post
- Creating a validator middleware checking the request body against the sdefined Joi schema
- Adding this middleware in router so it is executed before the POST controller method

### Implementing a Redis cache

- Setting up a Redis store to be used for caching
- Creating a cache middleware and a flush middleware with time-based invalidation (data in cache will expire after the defined time) and event-based invalidation (if a new blog post is created, then the posts data is flushed from the cache)
- Placing those middleware in router

### Setting up the same API but with GraphQL (see 'graphQL' branch)

- Setting up GraphQL server
- Adding [schema](https://github.com/aureliechicart/oblog/tree/graphql/app/schemas) (types and [resolvers](https://github.com/aureliechicart/oblog/tree/graphql/app/resolvers))
- Testing [queries and mutations](https://github.com/aureliechicart/oblog/blob/graphql/graphql_tests.md) in GraphQL playground

## Technologies

- Node v16.14.0
- Express v4.17.2
- postgreSQL 12 database server
- pg (PostgreSQL client) v8.7.1
- sqitch v0.9999
- Redis v.6.2.6
- redis (client) v4.0.1
- dotenv v14.3.2
- cors v2.8.5
- express-swagger-generator v1.1.17
- joi v17.6.0
- graphql-yoga v1.18.3

## Install

Clone this repository.

In the terminal, at the root of the folder project, run the following command to install the dependencies:

```bash
npm i
```

### Database creation and seeding

Install [potsgreSQL](https://www.postgresql.org/download/), start it using command `sudo service postgresql start` and create a local [PostgreSQL database](https://www.postgresql.org/docs/12/app-createdb.html):

```bash
createdb <database_name>
```

Install [sqitch](https://sqitch.org/download/) and deploy the sqitch plan on your new database:

```bash
sqitch deploy db:pg://<pg_user>:<pg_password>@localhost:<pg_port>/<database_name>
```

Then run this js script to populate the database:

```bash
psql -d <database_name> -f /data/import.js
```

### Redis

This project uses a Redis store for caching.
Install [redis](https://redis.io/download) and make sure the server is running using the `redis-server` line command.

### Setting Environment Variables

Copy the .env.example file and update it with PORT and your postgres database connection parameters.

### Launch Command

Run the following command to start the server:

```bash
npm run dev
```

To test your access, go to localhost:`<port>`/v1/posts.  
:warning: Note the use of the prefix 'v1' in the path of the API endpoints' URI.

### Swagger

To access the Swagger doc and discover the available API endpoints, go to `http://localhost:<port>/api-docs`.

### Testing the GraphQL API

Access the graphQL branch:

```bash
git checkout graphql
```

Restart the server and visit `http://localhost:<port>/graphql` in your browser to excute queries and mutations. Review [this file](https://github.com/aureliechicart/oblog/blob/graphql/graphql_tests.md) for query and mutation examples.
