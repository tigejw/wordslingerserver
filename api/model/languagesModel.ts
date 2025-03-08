import { Language } from "@/types";
import { sql } from "kysely";
import { QueryResult } from "pg";
const db = require("../../db/connection");
const format = require("pg-format");

exports.selectLanguageByUserId = (user_id: number) => {
  console.log(user_id, "select");
  return db
    .query("SELECT * FROM languages WHERE user_id = $1", [user_id])
    .then((result: QueryResult<Language>) => {
      console.log("Db qury", result);
      return result.rows;
    });
};

exports.insertNewLanguageToUser = (language: string, user_id: number) => {
  const sqlString = format(
    `INSERT INTO languages (language, user_id, current_level) VALUES (%L);`,
    [language, user_id, 1]
  );
  console.log(sqlString);
  return db.query(sqlString).then((result: QueryResult<Language>) => {
    console.log(result.rows);
    return result.rows;
  });
};

exports.updateCurrentLevelByUserId = (user_id: number) => {
  return db;
};

// exports.insertNewAvaliableLanguage = (language: Language) => {
//   const sqlString = format(
//     "INSERT INTO avaliable_languages (language) VALUES %L RETURNING *;",
//     [[]]
//   );
//   return db.query(sqlString).then((result: QueryResult<Language>) => {
//     return result.rows;
//   });
// };
