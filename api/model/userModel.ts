import { User, Username } from "@/types";
import { QueryResult } from "pg";
const db = require("../../db/connection");
const format = require("pg-format");

exports.selectUsers = () => {
  return db.query("SELECT * FROM users").then((result: QueryResult<User>) => {
    return result.rows;
  });
};

exports.insertUser = (user: User) => {
  const sqlString = format(
    "INSERT INTO users (username, name, avatar_url, role, bio) VALUES %L RETURNING *;",
    [[user.username, user.name, user.avatar_url, user.role, user.bio]]
  );
  return db.query(sqlString).then((result: QueryResult<User>) => {
    return result.rows;
  });
};

exports.selectUserByUserId = (user_id: number) => {
  return db
    .query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
    .then((result: QueryResult<User>) => {
      return result.rows;
    });
};

// exports.updateUserByUserId = () => {};

exports.selectUserIdByUsername = (username: Username) => {
  const sqlString = format(
    "SELECT user_id FROM users WHERE username = %L",
    username
  );
  return db.query(sqlString).then((result: any) => {
    return result.rows;
  });
};

exports.deleteFromUsersByUserId = (user_id: number) => {
  const sqlString = format(`DELETE FROM users WHERE user_id = %s`, [user_id]);
  return db.query(sqlString).then((result: QueryResult<User>) => {
    return result.rows;
  });
};
