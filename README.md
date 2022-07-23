# Tic Tac Toe


## Requisites

- [NodeJS](https://nodejs.org/en/): Javascript running environment
- [Docker](https://docs.docker.com/engine/install/): containerization technology for building and containerizing applications
- [Docker-Compose](https://docs.docker.com/compose/install/): tool for defining and running multi-container Docker applications
- [Sails](https://sailsjs.com/get-started): Javascript MVC Framework. Run `npm install sails -g` in order to install sails utilities. 


## Install Dependencies

### Domain dependencies

At **root**, run

```
npm install
```

### Web dependencies

At **web** folder, run

```
npm install
```


## Initialize databases

At **root**, run

```
docker-compose up
```


## Seed databases

After initialiazing the databases, run

```
npm run seed
```

If you get `PostgresError: duplicate key value violates unique constraint "item_pkey"`, then keep running `npm run seed` until this error disappears.
It happens because the random data generator generated repeated data for columns that should be unique.


## Start web server

At **root** folder, run

```
sails lift
```

Then, the app will be available on `http://localhost:1337`.


## Database connections

The logic for handling database connections are at **databases** folder.

### Postgres

- database: `tictactoe`
- port: `5432`
- user: `admin`
- password: `admin`
- [postgres.js (connection file)](/databases/postgres.js)


### Neo4j

- Neo4j browser: `http://localhost:7474/browser`
- port: `7687`
- user: `neo4j`
- password: `development`
- [neo4j.js (connection file)](/databases/neo4j.js)

### Mongo DB

- database: `TIC_TAC_TOE`
- port: `27017`
- [mongodb.js (connection file)](/databases/mongodb.js)

### Redis

- port: `6379`
- [redis.js (connection file)](/databases/redis.js)


## Notes

- For authenticating, it's possible to create an account or pick an email from `seeded_users` file that is created after running `npm run seed` successfully. In the later case, the password is `123456`.


## Functionalities

- Sending match invitation (Play with a friend button)
- Match history listing
- Inventory listing
- Stores listing
- Buying items from stores
- Real-time notifications

## Known issues

- It's not possible to start a new match yet
- There is a bug in buying items from store flow, in which the type of the coins considered during the buy is switched