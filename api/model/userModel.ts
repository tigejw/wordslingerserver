import { User } from "@/types";
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

exports.deleteFromUsersByUserId = (user_id: number) => {
  console.log("deleteuser", user_id);
  return db
    .query(`DELETE FROM users WHERE user_id = $1`, [user_id])
    .then((result: QueryResult<any>) => {
      console.log(result);
      return result.rows;
    });
};
