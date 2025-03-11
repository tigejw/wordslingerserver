"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { insertGame, selectGames } = require("../model/gameModel");
exports.postGame = (req, res, next) => {
    const { room_id, winner, loser, winner_initial_points, winner_updated_points, loser_initial_points, loser_updated_points, language, english_wordlist, non_english_wordlist, winner_correct_answers, loser_correct_answers, } = req.body;
    console.log(room_id, winner, loser, winner_initial_points, winner_updated_points, loser_initial_points, loser_updated_points, language, english_wordlist, non_english_wordlist, winner_correct_answers, loser_correct_answers);
    console.log(typeof room_id, typeof winner, typeof loser, typeof winner_initial_points, typeof winner_updated_points, typeof loser_initial_points, typeof loser_updated_points, typeof language, typeof english_wordlist, typeof non_english_wordlist, typeof winner_correct_answers, typeof loser_correct_answers);
    insertGame({
        room_id,
        winner,
        loser,
        winner_initial_points,
        winner_updated_points,
        loser_initial_points,
        loser_updated_points,
        language,
        english_wordlist,
        non_english_wordlist,
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
