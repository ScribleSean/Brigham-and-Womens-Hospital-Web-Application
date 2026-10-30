# Brigham and Women's Hospital Web Application

A hospital web app with indoor wayfinding, service requests and admin tools. Built by a team of 11 for an Agile/Scrum software engineering course in 2024. It is an archived class project, not an official hospital service, and there is no live demo.

## Features

- Multi-floor map with directions from BFS, DFS, Dijkstra's or A* pathfinding, and a route option that avoids stairs.
- Auth0 sign-in with staff and admin views of service requests: medical devices, medicine, food, flowers, gifts, religious services and room scheduling.
- Admin tools for map nodes and edges, employee records, CSV import and export, and charts of request status, priority, user and type.

## Requirements

- Node.js 18 or later with Corepack enabled (`corepack enable`), which provides Yarn 4
- Docker with Docker Compose

## Run it

The simplest way to run the app locally is the development Compose stack, which starts the frontend, backend and a PostgreSQL database:

```sh
yarn install
yarn dev:docker
```

The frontend is served at http://localhost:3000 and the API at port 3001. The development database listens on `localhost:5432` with username, password and database all set to `dev`. Stop everything with:

```sh
yarn dev:stop
```

Other scripts:

| Command | What it does |
| --- | --- |
| `yarn db` | Start only the PostgreSQL container |
| `yarn dev` | Run the frontend and backend on the host, reading `.env` |
| `yarn test` | Run the Vitest suite (UI at http://localhost:51204/__vitest__/) |
| `yarn test:docker` | Run tests against a containerized database |
| `yarn lint` / `yarn lint:fix` | Check or fix lint and formatting |
| `yarn fix` | Clear the Yarn and Turbo caches and rebuild |

These commands come from the original course setup and have not been retested since the course ended.

## Production

`docker-compose.prod.yaml` runs the frontend and backend behind Traefik, which handles HTTPS through Let's Encrypt. It expects an external PostgreSQL database. Set these variables before running `yarn deploy`; the values below are placeholders:

```text
APP_HOST=<public-hostname>
ACME_EMAIL=<lets-encrypt-contact-email>
POSTGRES_HOST=<database-host>
POSTGRES_PASSWORD=<database-password>
DATABASE_URL=<postgresql-connection-url>
```

Stop it with `yarn deploy:stop`.

## Project structure

This is a Yarn workspaces monorepo managed with Turborepo.

| Path | Contents |
| --- | --- |
| `apps/frontend` | React and Vite frontend |
| `apps/backend` | Express API |
| `packages/common` | Code shared by the frontend and backend |
| `packages/database` | Prisma schema and client |
| `configs/` | Shared ESLint, Prettier and TypeScript configs |
| `scripts/` | Helper scripts used by `yarn fix` and `yarn sync` |
| `Dockerfile`, `docker-compose.*.yaml` | Development, test and production containers |
| `.run/` | WebStorm run configurations (`Start Dev`, `Start Tests`, `Debug`) |

## License

No license has been chosen. All rights are reserved by the contributors.
