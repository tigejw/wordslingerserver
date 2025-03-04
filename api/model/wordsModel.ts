const db = require("../../db/connection");
import { Word } from "@/types";

exports.selectWords = (
  language: "german" | "spanish" | "french",
  english: string
) => {
  let query = db.selectFrom("words").selectAll();
  if (language) query = query.where("language", "like", language);
  if (english) query = query.where("english", "like", english);
  return query.execute();
};
exports.selectWordbyLevel = () => {
  return db.selectFrom("words").selectAll().exectueTakeFirst();
};
