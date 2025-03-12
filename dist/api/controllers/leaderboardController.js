"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { selectLeaderboardEntryByUserIdAndLanguage, updateLeaderboardEntryByUserIdAndLanguage, selectAllLeaderboardEntries, insertNewLeaderboardEntry, } = require("../model/leaderboardModel");
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
exports.getAllLeaderboardEntries = (req, res, next) => {
    selectAllLeaderboardEntries()
        .then((leaderboardEntries) => {
        res.status(200).send({ leaderboardEntries: leaderboardEntries });
    })
        .catch((err) => {
        next(err);
    });
};
exports.postNewLeaderboardEntry = (req, res, next) => {
    const { user_id, language } = req.body;
    insertNewLeaderboardEntry(user_id, language)
        .then((leaderboardEntry) => {
        res.status(201).send({ leaderboardEntry: leaderboardEntry });
    })
        .catch((err) => {
        next(err);
    });
};
