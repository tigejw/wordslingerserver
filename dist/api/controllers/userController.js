"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { selectUsers, insertUser, selectUserByUserId, updateUserByUserId, deleteFromUsersByUserId, } = require("../model/userModel");
//change err: any
exports.getUsers = (req, res, next) => {
    selectUsers()
        .then((users) => {
        res.status(200).send({ users: users });
    })
        .catch((err) => {
        next(err);
    });
};
exports.postUser = (req, res, next) => {
    const newUser = req.body;
    insertUser(newUser)
        .then((user) => {
        res.status(201).send({ user: user });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getUserByUserId = (req, res, next) => {
    const { user_id } = req.params;
    selectUserByUserId(user_id)
        .then((user) => {
        res.status(200).send({ user: user });
    })
        .catch((err) => {
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
exports.deleteUserByUserId = (req, res, next) => {
    const { user_id } = req.params;
    deleteFromUsersByUserId(user_id)
        .then(() => {
        res.status(204).send();
    })
        .catch((err) => {
        next(err);
    });
};
