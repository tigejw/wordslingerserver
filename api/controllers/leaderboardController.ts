import { Leaderboard } from "@/types";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
const {
  selectLeaderboardEntryByUserIdAndLanguage,
} = require("../model/leaderboardModel");

exports.getLeaderboardEntryByUserIdAndLanguage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id, language } = req.params;
  selectLeaderboardEntryByUserIdAndLanguage(user_id, language)
    .then((leaderboardEntry: Leaderboard) => {
      res.status(200).send({ leaderboardEntry: leaderboardEntry });
    })
    .catch((err: any) => {
      next(err);
    });
};
