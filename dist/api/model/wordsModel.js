"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../../db/connection");
const format = require("pg-format");
exports.selectWordsIndex = () => {
    return db.query("SELECT * FROM words").then((result) => {
        return result.rows;
    });
};
exports.selectByTargetLanguage = (targetLanguage) => {
    const queryString = format(`SELECT english, %I, image_url, word_level FROM words`, targetLanguage);
    return db.query(queryString).then((result) => {
        return result.rows;
    });
};
exports.selectWordByLevel = (targetLanguage, level) => {
    const queryString = format(`SELECT english, %I FROM words WHERE word_level = %L`, targetLanguage, level);
    return db.query(queryString).then((result) => {
        return result.rows;
    });
};
