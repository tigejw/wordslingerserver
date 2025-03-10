"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiRouter = require("express").Router();
const userRoutes_1 = __importDefault(require("./userRoutes"));
const languageRouters_1 = __importDefault(require("./languageRouters"));
const wordsRouter_1 = __importDefault(require("./wordsRouter"));
const gameRouters_1 = __importDefault(require("./gameRouters"));
const verifyRouter_1 = __importDefault(require("./verifyRouter"));
apiRouter.use("/users", userRoutes_1.default);
apiRouter.use("/language", languageRouters_1.default);
apiRouter.use("/games", gameRouters_1.default);
apiRouter.use("/word-list", wordsRouter_1.default);
console.log("in apirouter");
apiRouter.use("/verify", verifyRouter_1.default);
exports.default = apiRouter;
