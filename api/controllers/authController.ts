import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
const { verifyUsernameAndPassword } = require("../model/authModel");

exports.authUser = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  verifyUsernameAndPassword({ username, password })
    .then((verification: Boolean) => {
      res.status(200).send({ username: username, verification: verification });
    })
    .catch((err: any) => {
      next(err);
    });
};
