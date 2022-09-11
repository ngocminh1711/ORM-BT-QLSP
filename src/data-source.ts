import 'reflect-metadata';

import { DataSource } from 'typeorm';


export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'test',
    synchronize: true,
    logging: true,
    entities: ['./dist/src/entity/*js'],
    migrations: ['/dist/src/migrations/*js'],
})