import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import cors from 'cors';
import routes from './routes/index';
import 'dotenv-safe/config';
import { logger, requestLogger } from './middleware/logger';
import setAccessHeaders from './middleware/setAccessHeaders';
import path from 'path';
import errorHandler from './middleware/errorHandler';

const main = async () => {
    await createConnection({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        logging: true,
        // synchronize: true,
        migrations: [path.join(__dirname, './migrations/*')],
        entities: [],
    });

    const app = express();

    app.use(
        cors({
            origin: process.env.CORS_ORIGIN,
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
        const isLocal = 'undefined' === typeof process.env.NODE_ENV || 'development' === process.env.NODE_ENV;
        app.set('port', process.env.PORT);
        const server = app.listen(app.get('port'), () => {
            logger({ msg: `Express running → PORT ${isLocal ? 'localhost:' : ''}${server.address().port}` });
        });
    } else {
        logger({ msg: 'PORT is not defined!', type: 'ERROR' });
    }
};

main().catch((err) => {
    logger({ msg: 'Could not start server!', type: 'ERROR', details: err });
});
