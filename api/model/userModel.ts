import { User, NewUser, UpdateUser } from "@/types";
const db = require("../database");

exports.selectUsers = () => {
  return db.selectFrom("users").selectAll().execute();
};

exports.insertUser = (user: NewUser) => {
  return db
    .insertInto("users")
    .values({
      username: user.username,
      name: user.name,
      avatar_url: user.avatar_url,
      role: user.role,
      bio: user.bio,
    })
    .returningAll()
    .exectueTakeFirst();
};

exports.selectUserByUserId = (user_id: number) => {
  return db
    .selectFrom("users")
    .selectAll()
    .where("user_id", "=", user_id)
    .executeTakeFirst();
};

// exports.updateUserByUserId = () => {};

exports.deleteFromUsersByUserId = (user_id: number) => {
  return db
    .deleteFrom("users")
    .where("user_id", "=", user_id)
    .executeTakeFirst();
};
