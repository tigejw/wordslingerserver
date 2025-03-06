import { User } from "@/types";
const db = require("../../db/connection");

exports.selectUsers = () => {
  return db.query("SELECT * FROM users").then((res: Response) => {
    console.log(res.body, "userModel");
  });
};

exports.insertUser = (user: User) => {};

exports.selectUserByUserId = (user_id: number) => {};

// exports.updateUserByUserId = () => {};

exports.deleteFromUsersByUserId = () => {};
