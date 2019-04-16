# Postgres

- docker run \
  --name postgres-db \
  -p 5432:5432 \
  -e POSTGRES_DB=heroes \
  -e POSTGRES_USER=root \
  -e POSTGRES_PASSWORD=root \
  -d \
  postgres

# Mongo

- docker run \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=admin \
  -d \
  mongo:4

## Criação de usuário

- docker exec -it mongodb \
  mongo --host localhost -u admin -p admin --authenticationDatabase admin \
  --eval "db.getSiblingDB('herois').createUser({ user: 'gera', pwd: 'gera', roles: [{ role: 'readWrite', db: 'heroes' }] })"

# Mongo Client

- docker run \
  --name mongoclient \
  -p 3000:3000 \
  --link mongodb:mongodb-link \
  -d \
  mongoclient/mongoclient

# Adminer

- docker run \
  --name adminer-client \
  -p 8080:8080 \
  --link postgres-db:postgres-db \
  -d \
  adminer
