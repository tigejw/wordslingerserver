import { Request, Response, NextFunction } from "express";
const { selectWords } = require("../model/wordsModel");

exports.getWords = (req: Request, res: Response, next: NextFunction) => {
  //selectWords
  //build in queries for
  // get word by language
  // get word by level
  // get word by english word
};
