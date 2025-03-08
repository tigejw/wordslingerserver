"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "development";
require("dotenv").config({
    path: `${__dirname}/../.env.${ENV}`,
});
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
    throw new Error("PGDATABASE or DATABASE_URL not set");
}
const prodConfig = {};
if (ENV === "production") {
    prodConfig.connectionString = process.env.DATABASE_URL;
    prodConfig.max = 2;
}
module.exports = new Pool(prodConfig);
