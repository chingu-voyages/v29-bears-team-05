import path from 'path';
import { createConnection, getConnection } from 'typeorm';

const mockConnection = {
  async create() {
    const entities = path.join(__dirname, './../entity/network/*.js');
    const migrations = path.join(__dirname, './../migration/network/*.js');
    const subscribers = path.join(__dirname, './../subscriber/network/*.js');
    return await createConnection({
      name: 'test',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'keybound_api_test',
      synchronize: true,
      logging: false,
      dropSchema: true,
      entities: [entities],
      migrations: [migrations],
      subscribers: [subscribers],
      cli: {
        entitiesDir: './../../src/entity/network',
        migrationsDir: './../../src/migration/network',
        subscribersDir: './../../src/subscriber/network',
      },
    });
  },

  get() {
    return getConnection('test');
  },

  async close() {
    await getConnection('test').close();
  },

  async clear() {
    const connection = getConnection('test');
    const entities = connection.entityMetadatas;

    await Promise.all(
      entities.map(async (entity) => {
        const repository = connection.getRepository(entity.name);
        await repository.query(`DELETE FROM ${entity.tableName}`);
      })
    );
  },
};

export default mockConnection;
