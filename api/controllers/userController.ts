import { Request, Response, NextFunction } from "express";
import { User } from "../types";
const {
  selectUsers,
  insertUser,
  selectUserByUserId,
  updateUserByUserId,
  deleteFromUsersByUserId,
} = require("../model/userModel");

exports.getUsers = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send(selectUsers());
};

exports.postUser = (req: Request, res: Response, next: NextFunction) => {
  //   insertUser(userdata).then((user: User)=>{
  //     res.status(201).send({user: user})
  //   })
  res.status(200).send(insertUser());
};

exports.getUserByUserId = (req: Request, res: Response, next: NextFunction) => {
  //selectUserByUserId()
};

exports.patchUserByUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //updateUserByUserId()
};

exports.deleteUserByUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //deleteFromUsersByUserId
};
