"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.words_index = words_index;
exports.words_targetLanguage = words_targetLanguage;
exports.words_level = words_level;
const { selectWordsIndex, selectWordByLevel, selectByTargetLanguage, } = require("../model/wordsModel");
async function words_index(req, res, next) {
    const { targetLanguage, userLanguage } = req.query;
    selectWordsIndex(targetLanguage, userLanguage)
        .then((words) => {
        res.status(200).send({ words: words });
    })
        .catch((err) => {
        console.log(err);
        next();
    });
}
function words_targetLanguage(req, res, next) {
    // const { targetLanguage, userLanguage } = req.query;
    const { targetLanguage } = req.params;
    const { usersLanguage } = req.body;
    selectByTargetLanguage(targetLanguage, usersLanguage).then((words) => {
        res.status(200).send({ words: words });
    });
}
function words_level(req, res, next) {
    const { targetLanguage } = req.params;
    const { usersLanguage } = req.body.user;
    const level = req.body.selectedLevel;
    selectWordByLevel(targetLanguage, level).then((words) => {
        res.status(200).send({ words: words });
    });
}
