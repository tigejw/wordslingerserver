"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { insertGame, selectGames } = require("../model/gameModel");
exports.postGame = (req, res, next) => {
    const { room_id, winner, loser, wordlist, winner_correct_answers, loser_correct_answers, } = req.body;
    insertGame({
        room_id,
        winner,
        loser,
        wordlist,
        winner_correct_answers,
        loser_correct_answers,
    })
        .then((game) => {
        res.status(201).send({ game: game });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getGamesByUser = (req, res, next) => {
    const { user_id } = req.params;
    selectGames(user_id)
        .then((game) => {
        res.status(200).send({ game: game });
    })
        .catch((err) => {
        next(err);
    });
};
