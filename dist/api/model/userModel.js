"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../../db/connection");
const format = require("pg-format");
exports.selectUsers = () => {
    return db.query("SELECT * FROM users").then((result) => {
        return result.rows;
    });
};
exports.insertUser = (user) => {
    const sqlString = format("INSERT INTO users (username, name, avatar_url, role, bio) VALUES %L RETURNING *;", [[user.username, user.name, user.avatar_url, user.role, user.bio]]);
    return db.query(sqlString).then((result) => {
        return result.rows;
    });
};
exports.selectUserByUserId = (user_id) => {
    return db
        .query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
        .then((result) => {
        return result.rows;
    });
};
// exports.updateUserByUserId = () => {};
exports.deleteFromUsersByUserId = (user_id) => {
    const sqlString = format(`DELETE FROM users WHERE user_id = %s`, [user_id]);
    return db.query(sqlString).then((result) => {
        return result.rows;
    });
};
