import { Request, Response, NextFunction } from "express";
const { selectWords, selectWordbyLevel } = require("../model/wordsModel");
import { Word } from "@/types";

exports.getWords = (req: Request, res: Response, next: NextFunction) => {
  const { language, english } = req.query;
  selectWords(language, english)
    .then((words: Word[]) => {
      res.status(200).send({ words: words });
    })
    .catch((err: any) => {
      next(err);
    });

  //build in queries for
  // get word by language
  // get word by level
  // get word by english word
};

exports.getWordsByLevel = (req: Request, res: Response, next: NextFunction) => {
  const { word_level } = req.params;
  selectWordbyLevel(word_level)
    .then((words: Word[]) => {
      res.status(200).send({ words: words });
    })
    .catch((err: any) => {
      next(err);
    });
};
