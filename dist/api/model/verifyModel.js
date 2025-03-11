"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../../db/connection");
exports.verifyUsernameAndPassword = ({ username, password, }) => {
    if (!username ||
        !password ||
        typeof username !== "string" ||
        typeof password !== "string") {
        return Promise.reject({
            status: 400,
            msg: "Bad request!",
        });
    }
    return db
        .query(`SELECT username FROM users WHERE username = $1 AND password = crypt($2, password)`, [username, password])
        .then(({ rows }) => {
        return rows.length > 0;
    });
};
