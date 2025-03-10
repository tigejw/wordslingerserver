import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { User } from "../../types";
const {
  selectUsers,
  insertUser,
  selectUserByUserId,
  updateUserByUserId,
  deleteFromUsersByUserId,
  selectUserIdByUsername,
} = require("../model/userModel");

//change err: any

exports.getUsers = (req: Request, res: Response, next: NextFunction) => {
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

exports.getUser = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req.params;

  if (isNaN(Number(req.params.user))) {
    selectUserIdByUsername(user)
      .then((user: User) => {
        res.status(200).send({ user: user });
      })
      .catch((err: any) => {
        next(err);
      });
  } else {
    selectUserByUserId(user)
      .then((user: User) => {
        res.status(200).send({ user: user });
      })
      .catch((err: any) => {
        next(err);
      });
  }
};

exports.deleteUserByUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req.params;
  deleteFromUsersByUserId(user)
    .then(() => {
      res.status(204).send();
    })
    .catch((err: any) => {
      next(err);
    });
};

//NICE TO HAVE - what do we want to update?

// exports.patchUserByUserId = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { user_id } = req.params;
//   const updateUser = req.body;
//   updateUserByUserId(user_id, updateUser);
// };
