"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usersRouter = require("express").Router();
const { getUsers, postUser, getUserByUserId, patchUserByUserId, deleteUserByUserId, } = require("../controllers/userController");
usersRouter.route("/").get(getUsers).post(postUser);
usersRouter.route("/:user_id").get(getUserByUserId).delete(deleteUserByUserId);
exports.default = usersRouter;
