"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { selectLeaderboardEntryByUserIdAndLanguage, updateLeaderboardEntryByUserIdAndLanguage, } = require("../model/leaderboardModel");
exports.getLeaderboardEntryByUserIdAndLanguage = (req, res, next) => {
    const { user_id, language } = req.params;
    selectLeaderboardEntryByUserIdAndLanguage(user_id, language)
        .then((leaderboardEntry) => {
        res.status(200).send({ leaderboardEntry: leaderboardEntry });
    })
        .catch((err) => {
        next(err);
    });
};
exports.patchLeaderboardEntryByUserIdAndLanguage = (req, res, next) => {
    const { user_id, language } = req.params;
    const { newRank } = req.body;
    updateLeaderboardEntryByUserIdAndLanguage(user_id, language, newRank)
        .then((updatedRank) => {
        res.status(200).send({ updatedRank: updatedRank });
    })
        .catch((err) => {
        next(err);
    });
};
