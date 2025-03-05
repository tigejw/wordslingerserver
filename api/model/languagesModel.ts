import { Language } from "@/types";
const db = require("../../db/connection");

exports.insertLanguage = (language: Language) => {
  return db
};

exports.selectLanguageByUserId = (user_id: number) => {
  return db
};

exports.updateCurrentLevelByUserId = (user_id: number) => {
  return db
};
