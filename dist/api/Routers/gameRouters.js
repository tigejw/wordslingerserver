"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gameRouter = require("express").Router();
const { postGame, getGamesByUser } = require("../controllers/gameController");
gameRouter.route("/").post(postGame);
gameRouter.route("/:user_id").get(getGamesByUser);
exports.default = gameRouter;
