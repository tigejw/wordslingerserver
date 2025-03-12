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
  level_id: number
) => {
  const queryString = format(
    `SELECT english, %I, image_url FROM words WHERE word_level = %L`,
    targetLanguage,
    level_id
  );

  return db.query(queryString).then((result: QueryResult<Word>) => {
    return result.rows;
  });
};

exports.selectWordForGame = (
  targetLanguage: "german" | "spanish" | "french",
  levelCeiling: number
) => {
  const queryString = format(
    `SELECT english, %I, word_level, image_url FROM words WHERE word_level <= %L`,
    targetLanguage,
    levelCeiling
  );
  return db.query(queryString).then((result: QueryResult<Word>) => {
    return result.rows;
  });
};
