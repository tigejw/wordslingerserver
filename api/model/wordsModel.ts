const db = require("../../db/connection");
import { Word } from "@/types";
import { QueryResult } from "pg";

exports.selectWords = (
  language: "german" | "spanish" | "french",
  english: string
) => {
  return db.query("SELECT * FROM words").then((result: QueryResult<Word>) => {
    return result.rows;
  });
};
exports.selectWordbyLevel = () => {
  return db.selectFrom("words").selectAll().exectueTakeFirst();
};

// let query = db.selectFrom("words").selectAll();
// if (language) query = query.where("language", "like", language);
// if (english) query = query.where("english", "like", english);
