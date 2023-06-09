import dotenv from 'dotenv';
import {type DataSourceOptions, type EntityManager} from 'typeorm';
import UserEntity from '../entities/users.entity.js';
import connection from '../datasource/db.datasource';
import TicketEntity from '../entities/tickets.entity.js';
import TicketAnswerEntity from '../entities/tickets-ans.entity.js';

dotenv.config({path: './src/env/.env'});
// eslint-disable-next-line @typescript-eslint/naming-convention
const {DB_HOST, DB_PORT, DB_USERNAME,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    DB_PASSWORD, DB_DATABASE, SERVER_PORT} = process.env;

const dbOptions: DataSourceOptions
= {
    type: 'postgres',
    host: DB_HOST,
    port: parseInt(DB_PORT!, 10),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    entities: [
        UserEntity,
        TicketEntity,
        TicketAnswerEntity,
    ],
    synchronize: true,
    // Logging: true,
    migrations: [
        '../migrations/*.ts',
    ],
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export default {dbOptions, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_PORT, DB_USERNAME,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    SERVER_PORT};
