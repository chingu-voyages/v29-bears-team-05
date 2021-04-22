# Awesome Project Build with TypeORM

Steps to run this project:
1. Ensure [docker and docker-compose](https://www.docker.com/get-started) is installed in your system
2. Adjust postgres server settings if needed at the project root's `docker-compose.yml` file. Default settings: `USER=postgres`, `PASSWORD=admin`, `PORT=5432`
3. Start postgres server in the background: `docker-compose up -d`.  Can close the postgres server with `docker-compose down`
4. Run `npm i` command
5. Setup database settings inside `ormconfig.json` file
5. Run `npm run mockdata` command to populate mock data to database
6. Run `npm start` command
