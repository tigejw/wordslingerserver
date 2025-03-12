"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.words_index = words_index;
exports.words_targetLanguage = words_targetLanguage;
exports.words_level = words_level;
exports.words_game = words_game;
const { selectWordsIndex, selectWordByLevel, selectByTargetLanguage, selectWordForGame, } = require("../model/wordsModel");
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
    const { targetLanguage } = req.params;
    selectByTargetLanguage(targetLanguage).then((words) => {
        res.status(200).send({ words: words });
    });
}
function words_level(req, res, next) {
    const { targetLanguage, level_id } = req.params;
    selectWordByLevel(targetLanguage, level_id).then((words) => {
        res.status(200).send({ words: words });
    });
}
function words_game(req, res, next) {
    const { targetLanguage } = req.params;
    const player1Level = req.body.player1.user_level;
    const player2Level = req.body.player2.user_level;
    const levelCeiling = Math.min(player1Level, player2Level);
    selectWordForGame(targetLanguage, levelCeiling).then((words) => {
        res.status(200).send({ words: words });
    });
}
