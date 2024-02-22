
## Create a .env file with contents from .env.dist adjusted as needed

## Start docker-compose

```
docker-compose up -d
```

## Migrations

### Create migration ( creates a file that needs to be adjusted )

```
npm run typeorm:cli -- migration:create -n MigrationName
```

### Generate migration ( created a file with migration commands already populated)

The migration includes the sql commands that need to run in order for the current db to reflect
the changes in the typeorm declarations

```
npm run typeorm:cli -- migration:generate -n MigrationName
```

### Run migrations

```
npm run typeorm:cli -- migration:run
```

### Revert migrations

```
npm run typeorm:cli -- migration:revert
```
