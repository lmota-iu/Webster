# Server

## About

A graphic-design application, written in NestJS, with the use of PostgreSQL, Prisma.

## Setup & Run

Prior to setup, create an `.env` file based on the `.env.example` file, and fill in the required vars.

## Installation

```bash
# in the `server/` directory
$ yarn install
$ yarn run prisma:prepare
$ yarn run migrate:dev
```

## Running the app

```bash
# development
$ yarn run dev
```

You can now access the API, using the port, provided in the `.env` file.

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
