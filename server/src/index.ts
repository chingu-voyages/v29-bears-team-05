import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import 'dotenv-safe/config';
import routes from './routes/index';
import { logger, requestLogger } from './middleware/logger';
import setAccessHeaders from './middleware/setAccessHeaders';
import errorHandler from './middleware/errorHandler';
import { createTypeormConn } from './utils/createTypeormConn';

const main = async () => {
  const isDev =
    'undefined' === typeof process.env.NODE_ENV ||
    'development' === process.env.NODE_ENV;

  await createTypeormConn(isDev);

  const app = express();

  const whitelist: any[] = [
    // main vercel url
    process.env.CORS_ORIGIN,
    // our individual vercel urls
    process.env.CORS_ORIGIN1,
    process.env.CORS_ORIGIN2,
    process.env.CORS_ORIGIN3,
    process.env.CORS_ORIGIN4,
  ]

  app.use(
    cors({
      origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      },
      credentials: true,
    })
  );

  app.use(requestLogger);

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(setAccessHeaders);

  app.use('/', routes);

  app.use(errorHandler);

  if (process.env.PORT) {
    app.set('port', process.env.PORT);
    const server = app.listen(app.get('port'), () => {
      logger({
        msg: `Express running → PORT ${isDev ? 'localhost:' : ''}${
          server.address().port
        }`,
      });
    });
  } else {
    logger({ msg: 'PORT is not defined!', type: 'ERROR' });
  }
};

main().catch((err) => {
  logger({ msg: 'Could not start server!', type: 'ERROR', details: err });
});
