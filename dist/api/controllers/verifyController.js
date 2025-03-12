"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { verifyUsernameAndPassword } = require("../model/verifyModel");
exports.verifyUser = (req, res, next) => {
    const { username, password } = req.body;
    verifyUsernameAndPassword({ username, password })
        .then((verification) => {
        res.status(200).send({ username: username, verification: verification });
    })
        .catch((err) => {
        next(err);
    });
};
