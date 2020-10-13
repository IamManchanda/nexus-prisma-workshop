# GraphQL: Nexus & Prisma Workshop

## Installation

```bash
npm install
```

## Migration

```bash
npx prisma migrate save --experimental

npx prisma migrate up --experimental

npx prisma generate
```

## Database Access

Update `<prod_postgres_connection_url>` with your Database Connection URL in `# prisma/.env`

```bash
# prisma/.env
DATABASE_URL="<prod_postgres_connection_url>?schema=public"
```

Also update the `<test_postgres_connection_url>` in `tests/__helpers.ts` file for testing

```bash
# tests/__helpers.ts
databaseUrl = `<test_postgres_connection_url>?schema=${schema}`;
```

## Start the Development Server

```bash
npm run dev
```

## Start the Testing Server

```bash
npm run test
```
