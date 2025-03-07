const db = require("../../db/connection");
import { Word } from "@/types";
import { QueryResult } from "pg";
const format = require("pg-format");

exports.selectWordsIndex = () => {
  return db.query("SELECT * FROM words").then((result: QueryResult<Word>) => {
    return result.rows;
  });
};

exports.selectByTargetLanguage = (
  targetLanguage: "german" | "spanish" | "french"
) => {
  const queryString = format(
    `SELECT %I, word_level FROM words`,
    targetLanguage
  );
  return db.query(queryString).then((result: QueryResult<Word>) => {
    return result.rows;
  });
};

exports.selectWordByLevel = (
  targetLanguage: "german" | "spanish" | "french",
  level: number
) => {
  const queryString = format(
    `SELECT %I FROM words WHERE word_level = %L`,
    targetLanguage,
    level
  );

  console.log(queryString);

  return db.query(queryString).then((result: QueryResult<Word>) => {
    return result.rows;
  });
};

// let query = db.selectFrom("words").selectAll();
// if (language) query = query.where("language", "like", language);
// if (english) query = query.where("english", "like", english);
