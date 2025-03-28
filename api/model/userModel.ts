import { User, Username } from "@/types";
import { QueryResult } from "pg";
const db = require("../../db/connection");
const format = require("pg-format");
const { checkExists } = require("../../db/seeds/utils");

exports.selectUsers = () => {
  return db.query("SELECT * FROM users").then((result: QueryResult<User>) => {
    return result.rows;
  });
};

exports.insertUser = (user: User) => {
  const queryString = `
    INSERT INTO users (username, name, password, avatar_url, role, bio)
    VALUES ($1, $2, crypt($3, gen_salt('bf')), $4, $5, $6)
    RETURNING *`;
  const { username, name, password, avatar_url, bio } = user;
  const params = [username, name, password, avatar_url, "user", bio];
  return db.query(queryString, params).then((result: QueryResult<User>) => {
    return result.rows;
  });
};

exports.selectUserByUserId = (user_id: number) => {
  return checkExists("users", "user_id", user_id).then(() => {
    return db
      .query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
      .then((result: QueryResult<User>) => {
        return result.rows;
      });
  });
};

// exports.updateUserByUserId = () => {};

exports.selectUserIdByUsername = (username: Username) => {
  const sqlString = format(
    "SELECT user_id FROM users WHERE username = %L",
    username
  );
  return checkExists("users", "username", username).then(() => {
    return db.query(sqlString).then((result: any) => {
      return result.rows;
    });
  });
};

exports.deleteFromUsersByUserId = (user_id: number) => {
  const sqlString = format(`DELETE FROM users WHERE user_id = %s`, [user_id]);
  return checkExists("users", "user_id", user_id).then(() => {
    return db.query(sqlString).then((result: QueryResult<User>) => {
      return result.rows;
    });
  });
};
