"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { selectUsers, insertUser, selectUserByUserId, updateUserByUserId, deleteFromUsersByUserId, selectUserIdByUsername, } = require("../model/userModel");
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
exports.getUser = (req, res, next) => {
    const { user } = req.params;
    if (isNaN(Number(req.params.user))) {
        selectUserIdByUsername(user)
            .then((user) => {
            res.status(200).send({ user: user });
        })
            .catch((err) => {
            next(err);
        });
    }
    else {
        selectUserByUserId(user)
            .then((user) => {
            res.status(200).send({ user: user });
        })
            .catch((err) => {
            next(err);
        });
    }
};
exports.deleteUserByUserId = (req, res, next) => {
    const { user } = req.params;
    deleteFromUsersByUserId(user)
        .then(() => {
        res.status(204).send();
    })
        .catch((err) => {
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
