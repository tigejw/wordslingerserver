"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usersRouter = require("express").Router();
const { getUsers, postUser, getUserByUserId, patchUserByUserId, deleteUserByUserId, } = require("../controllers/userController");
// users
//     get all users - returns all users
//     post user - post a new user
//     get specific user by user_id - access specific user by id
//     patch user by user_id - update a specific users ifo
//     delete user by user_id - delete a user
usersRouter.route("/").get(getUsers).post(postUser);
usersRouter
    .route("/:user_id")
    .get(getUserByUserId)
    // .patch(patchUserByUserId)
    .delete(deleteUserByUserId);
exports.default = usersRouter;
