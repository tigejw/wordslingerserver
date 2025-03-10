import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
const { insertGame, selectGames } = require("../model/gameModel");
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
      next(err);
    });
};

exports.getGamesByUser = (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.params;
  selectGames(user_id)
    .then((game: Game) => {
      res.status(200).send({ game: game });
    })
    .catch((err: any) => {
      next(err);
    });
};
