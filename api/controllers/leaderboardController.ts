import { Leaderboard } from "@/types";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
const {
  selectLeaderboardEntryByUserIdAndLanguage,
  updateLeaderboardEntryByUserIdAndLanguage,
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

exports.patchLeaderboardEntryByUserIdAndLanguage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id, language } = req.params;
  const { newRank } = req.body;
  updateLeaderboardEntryByUserIdAndLanguage(user_id, language, newRank)
    .then((updatedRank: number) => {
      res.status(200).send({ updatedRank: updatedRank });
    })
    .catch((err: any) => {
      next(err);
    });
};
