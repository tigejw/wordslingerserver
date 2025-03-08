"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../connection");
const format = require("pg-format");
exports.checkExists = (table, column, value) => {
    return db
        .query(format("SELECT * FROM %I WHERE %I = $1", table, column), [value])
        .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Not found!" });
        }
        else {
            return "It's alive!";
        }
    });
};
