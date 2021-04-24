import { getConnectionOptions, createConnection } from 'typeorm';

export const createTypeormConn = async (isDev: boolean = true) => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return createConnection({
    ...connectionOptions,
    name: 'default',
    // url: process.env.DATABASE_URL,
    logging: isDev,
    synchronize: isDev,
    dropSchema: isDev,
    migrationsRun: !isDev,
  });
};
