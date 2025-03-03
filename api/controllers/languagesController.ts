import { Language } from "@/types";
import { Request, Response, NextFunction } from "express";
const {
  selectLanguageByUserId,
  updateCurrentLevelByUserId,
  insertLanguage,
} = require("../model/languagesModel");

exports.postLanguage = (req: Request, res: Response, next: NextFunction) => {
  insertLanguage()
    .then((language: Language) => {
      res.status(201).send({ language: language });
    })
    .catch((err: any) => {
      next(err);
    });
};
exports.getLanguageByUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.params;
  selectLanguageByUserId(user_id)
    .then((language: Language) => {
      res.status(200).send({ language: language });
    })
    .catch((err: any) => {
      next(err);
    });
};

exports.patchCurrentLevelByUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.params;
  updateCurrentLevelByUserId(user_id)
    .then((current_level: number) => {
      res.status(200).send({ current_level: current_level });
    })
    .catch((err: any) => {
      next(err);
    });
};
