import { Request, Response, NextFunction } from "express";
const {
  selectLanguageByUserId,
  updateCurrentLevelByUserId,
  insertLanguage,
} = require("../model/languagesModel");

exports.postLanguage = (req: Request, res: Response, next: NextFunction) => {
  //insertLanguage
};
exports.getLanguageByUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //selectLanguageByUserId
};

exports.patchCurrentLevelByUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //updateCurrentLevelByUserId
};
