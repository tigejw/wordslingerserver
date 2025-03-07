import { Request, Response, NextFunction } from "express";
const { selectWords, selectWordbyLevel } = require("../model/wordsModel");
import { Word } from "@/types";
import { DatabaseError } from "../errors/DatabaseError";
import { GetLevelError } from "../errors/GetLevelError";

async function words_index(req: Request, res: Response, next: NextFunction) {
  const { language, english } = req.query;
  selectWords(language, english)
    .then((words: Word[]) => {
      res.status(200).send({ words: words });
    })
    .catch((err: any) => {
      next(new DatabaseError());
    });
}

function words_level(req: Request, res: Response, next: NextFunction) {
  const { byLevel } = req.params;
  selectWordbyLevel(byLevel)
    .then((words: Word[]) => {
      res.status(200).send({ words: words });
    })
    .catch((err: any) => {
      next(new GetLevelError());
    });
}

export { words_index, words_level };
