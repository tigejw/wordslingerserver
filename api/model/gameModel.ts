const db = require("../../db/connection");
import { Game } from "@/types";
import { QueryResult } from "pg";
exports.insertGame = ({
  room_id,
  winner,
  loser,
  wordlist,
  winner_correct_answers,
  loser_correct_answers,
}: Game) => {
  if (
    winner === undefined ||
    loser === undefined ||
    !Array.isArray(wordlist) ||
    !Array.isArray(winner_correct_answers) ||
    !Array.isArray(loser_correct_answers)
  ) {
    return Promise.reject({
      status: 400,
      message: "Bad request!",
    });
  }

  return db
    .query(
      "INSERT INTO games (room_id, winner, loser, wordlist, winner_correct_answers, loser_correct_answers) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        room_id,
        winner,
        loser,
        JSON.stringify(wordlist),
        JSON.stringify(winner_correct_answers),
        JSON.stringify(loser_correct_answers),
      ]
    )
    .then((result: QueryResult<Game>) => {
      return result.rows[0];
    });
};
