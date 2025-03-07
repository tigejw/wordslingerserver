import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
const { insertGame } = require("../model/gameModel");
import { Game } from "@/types";
exports.postGame = (req: Request, res: Response, next: NextFunction) => {
  const {
    room_id,
    winner,
    loser,
    wordlist,
    winner_correct_answers,
    loser_correct_answers,
  }: Partial<Game> = req.body;
  console.log("getting to controller");
  insertGame({
    room_id,
    winner,
    loser,
    wordlist,
    winner_correct_answers,
    loser_correct_answers,
  })
    .then((game: Game) => {
      res.status(201).send({ game: game });
    })
    .catch((err: any) => {
      console.log("getting to catch controller");
      next(err);
    });
};
