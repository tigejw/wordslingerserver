import { Language } from "@/types";
import { sql } from "kysely";
import { QueryResult } from "pg";
const db = require("../../db/connection");
const format = require("pg-format");
const { checkExists } = require("../../db/seeds/utils");

exports.selectLanguageByUserId = (user_id: number) => {
  return checkExists("languages", "user_id", user_id).then(() => {
    return db
      .query("SELECT * FROM languages WHERE user_id = $1", [user_id])
      .then((result: QueryResult<Language>) => {
        return result.rows;
      });
  });
};

exports.insertNewLanguageToUser = (language: string, user_id: number) => {
  const sqlString = format(
    `INSERT INTO languages (language, user_id, current_level) VALUES (%L) RETURNING *;`,
    [language, user_id, 1]
  );
  return checkExists("languages", "user_id", user_id).then(() => {
    return db.query(sqlString).then((result: QueryResult<Language>) => {
      return result.rows;
    });
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
