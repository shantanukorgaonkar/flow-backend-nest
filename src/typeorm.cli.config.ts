import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { resolve } from 'path';

config();
console.log(resolve(__dirname, 'db', 'migrations', '*'));
const DataSourceConfig = new DataSource({
    type: 'sqlite',
    // host: process.env.DB_HOST,
    // port: Number(process.env.DB_PORT),
    // username: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        "dist/**/*.entity{.ts,.js}"
    ],
    migrations: ["dist/db/migrations/*.js"],
    synchronize: false,
    extra: {
        charset: 'utf8mb4',
    },
    migrationsTableName: 'migrations',
    logging: true,
    // ssl: {
    //     rejectUnauthorized: false,
    // }
});


export default DataSourceConfig;
