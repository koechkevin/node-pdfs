const { config } = require("dotenv");
config();

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PG_PORT,
        host: process.env.DB_HOST,
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                // Other SSL options can be added here if needed
            }
        }
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PG_PORT,
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
            }
        }
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PG_PORT,
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
            }
        }
    },
};
