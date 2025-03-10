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
    `SELECT english, %I, image_url, word_level FROM words`,
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
    `SELECT english, %I FROM words WHERE word_level = %L`,
    targetLanguage,
    level
  );

  return db.query(queryString).then((result: QueryResult<Word>) => {
    return result.rows;
  });
};
