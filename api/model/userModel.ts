import { User } from "@/types";
import { QueryResult } from "pg";
const db = require("../../db/connection");

exports.selectUsers = () => {
  return db.query("SELECT * FROM users").then((result: QueryResult<User>) => {
    return result.rows;
  });
};

exports.insertUser = (user: User) => {};

exports.selectUserByUserId = (user_id: number) => {};

// exports.updateUserByUserId = () => {};

exports.deleteFromUsersByUserId = () => {};
