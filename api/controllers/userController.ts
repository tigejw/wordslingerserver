import { Request, Response, NextFunction } from "express";
import { User } from "../../types";
const {
  selectUsers,
  insertUser,
  selectUserByUserId,
  updateUserByUserId,
  deleteFromUsersByUserId,
} = require("../model/userModel");

//change err: any

exports.getUsers = (req: Request, res: any, next: NextFunction) => {
  selectUsers()
    .then((users: User[]) => {
      res.status(200).send({ users: users });
    })
    .catch((err: any) => {
      next(err);
    });
};

exports.postUser = (req: Request, res: Response, next: NextFunction) => {
  const newUser: User = req.body;
  insertUser(newUser)
    .then((user: User) => {
      res.status(201).send({ user: user });
    })
    .catch((err: any) => {
      next(err);
    });
};

exports.getUserByUserId = (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.params;
  selectUserByUserId(user_id)
    .then((user: User) => {
      res.status(200).send({ user: user });
    })
    .catch((err: any) => {
      next(err);
    });
};

//what do we want to update?

// exports.patchUserByUserId = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { user_id } = req.params;
//   const updateUser = req.body;
//   updateUserByUserId(user_id, updateUser);
// };

exports.deleteUserByUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.params;
  deleteFromUsersByUserId(user_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err: any) => {
      next(err);
    });
};
