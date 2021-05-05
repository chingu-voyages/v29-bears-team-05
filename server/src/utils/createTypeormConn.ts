import {
  getConnectionOptions,
  createConnection,
  ConnectionOptions,
} from 'typeorm';

const getOptions = async () => {
  let connectionOptions: ConnectionOptions;

  if (process.env.DATABASE_URL) {
    connectionOptions = {
      type: 'postgres',
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      url: process.env.DATABASE_URL,
      entities: ['dist/entity/*.*'],
      migrations: ['dist/migrations/*.*'],
    };
  } else {
    connectionOptions = await getConnectionOptions();
  }

  return connectionOptions;
};

export const createTypeormConn = async (isDev = true) => {
  const connectionOptions = await getOptions();

  return createConnection({
    ...connectionOptions,
    name: 'default',
    logging: isDev,
    synchronize: isDev,
    migrationsRun: !isDev,
  });
};
