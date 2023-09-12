import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"


import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";


const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "ashishjagtap",
    password: undefined,
    database: "online-bookstore",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
});

export {AppDataSource};

