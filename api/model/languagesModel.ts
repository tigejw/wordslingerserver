import { Language } from "@/types";
const db = require("../database");

exports.insertLanguage = (language: Language) => {
  return db
    .insertInto("languages")
    .values({
      username: language.username,
      language: language.language,
      current_level: language.current_level,
    })
    .returningAll()
    .executeTakeFirst();
};

exports.selectLanguageByUserId = (user_id: number) => {
  return db
    .selectFrom("languages")
    .selectAll()
    .where("user_id", "=", user_id)
    .executeTakeFirst();
};

exports.updateCurrentLevelByUserId = (user_id: number) => {
  return db
    .updateTable("languages")
    .set((eb: any) => {
      current_level: eb("current_level", "+", 1);
    })
    .where("user_id", "=", user_id)
    .exectueTakeFirst();
};
