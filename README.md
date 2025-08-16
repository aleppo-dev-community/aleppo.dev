# aleppo.dev

<p align="center">
  <a href="https://aleppo.dev">
    <img src="https://aleppo.dev/logo.svg" height="96">
    <h3 align="center">Aleppo Dev Community</h3>
  </a>
</p>

## Contributing

First, Thank you for your interest in contributing to [aleppo.dev](https://aleppo.dev).

### Local development

This project is configured in a monorepo, where one repository contains multiple npm packages. Dependencies are installed and managed with `pnpm`.

To get started, execute the following:

```
git clone git@github.com:aleppo-dev-community/aleppo.dev.git
cd aleppo.dev
pnpm install
pnpm dev
```

#### Environment Variables

`apps/api/.env`

```.env
# Local
DB_URL="postgres://postgres:password@localhost:5457/adc"
```

`apps/web/.env`

```.env
# Local
DB_URL="postgres://postgres:password@localhost:5457/adc"

BETTER_AUTH_SECRET=1QqHotsNHyFILdEdVw4UzNhY5M9FOKKI
# Mock, use your own credentials if you want to use authentication
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstuvwxyz

NEXT_PUBLIC_SERVER_URL="http://localhost:3010"

```

#### Database

The project uses [Neon](https://neon.com/) for the live database, however for local development, you can use [Docker](https://www.docker.com/) to run a local database.

```
cd apps/api
docker compose -f "docker-compose.yml" up -d --build
pnpm db:push # Apply the schema to the database
```

## License

[MIT](https://github.com/47ng/nuqs/blob/next/LICENSE)
