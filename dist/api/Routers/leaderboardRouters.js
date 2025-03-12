"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const leaderboardRouter = require("express").Router();
const { getLeaderboardEntryByUserIdAndLanguage, patchLeaderboardEntryByUserIdAndLanguage, getAllLeaderboardEntries, postNewLeaderboardEntry, } = require("../controllers/leaderboardController");
leaderboardRouter
    .route("/")
    .get(getAllLeaderboardEntries)
    .post(postNewLeaderboardEntry);
leaderboardRouter
    .route("/:user_id/:language")
    .get(getLeaderboardEntryByUserIdAndLanguage)
    .patch(patchLeaderboardEntryByUserIdAndLanguage);
exports.default = leaderboardRouter;
