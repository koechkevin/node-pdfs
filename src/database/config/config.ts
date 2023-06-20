import { config } from "dotenv";
config();

export const development = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PG_PORT,
    host: process.env.DB_HOST,
    dialect: "postgres",
};
export const test = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PG_PORT,
    dialect: "postgres",
};
export const production = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PG_PORT,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
        },
    },
};
