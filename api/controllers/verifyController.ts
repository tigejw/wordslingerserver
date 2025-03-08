import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
const { verifyUsernameAndPassword } = require("../model/verifyModel");

exports.verifyUser = (req: Request, res: Response, next: NextFunction) => {
  console.log("in verifycontroller")

  const { username, password } = req.body;

  verifyUsernameAndPassword({ username, password })
    .then((verification: Boolean) => {
      res.status(200).send({ username: username, verification: verification });
    })
    .catch((err: any) => {
      console.log("in verifycontroller catch")
      next(err);
    });
};
