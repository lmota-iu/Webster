# ACE - POC.1

ACE (Aplicação de Certificação Energética).
This is a POC to show the usage of the [Webster](https://github.com/YaroslavChuiko/Webster) project.

## Install & run

### Database

Is a ProsgresSQL database running in a docker container.
Start it by copying the `.env.example` file to `.env` and filling in the required vars.

Run `docker-compose up` and then `yarn run prisma:prepare` to migrate the database.

### Server

[Server](server/README.md)

### Client

[Client](client/README.md)

## Deployment diagram

![use_case](https://github.com/YaroslavChuiko/Webster/assets/32570823/6a2ed391-ebb9-4658-80bc-8a40f8c91260)

## Entity-relationship diagram

![Entity-relationship diagram](https://github.com/YaroslavChuiko/Webster/assets/32570823/f4057db3-eb7b-44fd-a83e-42e7c41ca826)

## Use-case diagram

![use_case](https://github.com/YaroslavChuiko/Webster/assets/32570823/7f126bf8-ff3e-4f58-aa52-9a16c1d0a98a)
