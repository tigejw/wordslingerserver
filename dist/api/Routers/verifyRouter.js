"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifyRouter = require("express").Router();
const { verifyUser } = require("../controllers/verifyController");
console.log("in verifyrouter");
verifyRouter.route("*").post(verifyUser);
exports.default = verifyRouter;
