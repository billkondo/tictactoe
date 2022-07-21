# Tic Tac Toe

## Install

```
npm install
npm install sails -g
cd web
npm install
cd ..
```

## Initialize databases

Download docker, then run the following command on terminal while on the tictactoe folder:

```
docker-compose up
```

## Seed databases

First, initialize databases.

Then, run the following command:
```
node run_seed.js
```

## Run web app

```
cd web
sails lift
```

The app will be available on `http://localhost:1337/`

## Accessing databases

First, initialize and seed the databases.

### Postgres

1) Download pgadmin
2) On the connection tab, use
- Port: `5432`
- Host name/address: `localhost`
- Username: `admin`
- Password: `admin`

### Neo4j

- Visit the URL `http://localhost:7474/browser/`

## Mongo DB

1) Open the mongoDB terminal through docker
2) Run the command `mongo`
3) Run `use TIC_TAC_TOE`

### Redis

1) Open the redis terminal through docker
2) Run the command `redis-cli`