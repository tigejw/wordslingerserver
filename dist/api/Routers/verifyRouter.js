"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifyRouter = require("express").Router();
const { verifyUser } = require("../controllers/verifyController");
verifyRouter.route("*").post(verifyUser);
exports.default = verifyRouter;
