"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../../db/connection");
const { checkExists } = require("../../db/seeds/utils");
const format = require("pg-format");
exports.insertGame = ({ room_id, winner, loser, wordlist, winner_correct_answers, loser_correct_answers, }) => {
    if (winner === undefined ||
        loser === undefined ||
        !Array.isArray(wordlist) ||
        !Array.isArray(winner_correct_answers) ||
        !Array.isArray(loser_correct_answers)) {
        return Promise.reject({
            status: 400,
            msg: "Bad request!",
        });
    }
    return checkExists("users", "user_id", winner)
        .then(() => {
        return checkExists("users", "user_id", loser);
    })
        .then(() => {
        return db.query("INSERT INTO games (room_id, winner, loser, wordlist, winner_correct_answers, loser_correct_answers) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [
            room_id,
            winner,
            loser,
            JSON.stringify(wordlist),
            JSON.stringify(winner_correct_answers),
            JSON.stringify(loser_correct_answers),
        ]);
    })
        .then((result) => {
        return result.rows[0];
    });
};
exports.selectGames = (user_id) => {
    const psqlString = format(`SELECT * FROM games WHERE winner = %L OR loser = %L`, user_id, user_id);
    return checkExists("users", "user_id", user_id)
        .then(() => {
        return db.query(psqlString);
    })
        .then((result) => {
        return result.rows;
    });
};
