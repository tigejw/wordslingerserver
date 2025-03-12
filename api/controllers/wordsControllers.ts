import { Request, Response, NextFunction } from "express";
const {
  selectWordsIndex,
  selectWordByLevel,
  selectByTargetLanguage,
  selectWordForGame,
} = require("../model/wordsModel");
import { Word } from "@/types";

async function words_index(req: Request, res: Response, next: NextFunction) {
  const { targetLanguage, userLanguage } = req.query;
  selectWordsIndex(targetLanguage, userLanguage)
    .then((words: Word[]) => {
      res.status(200).send({ words: words });
    })
    .catch((err: any) => {
      console.log(err);
      next();
    });
}

function words_targetLanguage(req: Request, res: Response, next: NextFunction) {
  const { targetLanguage } = req.params;
  selectByTargetLanguage(targetLanguage).then(
    (words: Word[]) => {
      res.status(200).send({ words: words });
    }
  );
}

function words_level(req: Request, res: Response, next: NextFunction) {
  const { targetLanguage } = req.params;
  const { usersLanguage } = req.body.user;
  const level = req.body.selectedLevel;
  selectWordByLevel(targetLanguage, level).then((words: Word[]) => {
    res.status(200).send({ words: words });
  });
}

function words_game(req: Request, res: Response, next: NextFunction) {
  const { targetLanguage } = req.params;
  const { usersLanguage } = req.body.player1;
  const player1Level = req.body.player1.user_level;
  const player2Level = req.body.player2.user_level;
  const levelCeiling = Math.min(player1Level, player2Level);

  selectWordForGame(targetLanguage, levelCeiling).then((words: Word[]) => {
    res.status(200).send({ words: words });
  });
}

export { words_index, words_targetLanguage, words_level, words_game };
