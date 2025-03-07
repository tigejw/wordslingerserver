"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gameRouter = require("express").Router();
const { postGame } = require("../controllers/gameController");
gameRouter.route("/").post(postGame);
exports.default = gameRouter;
