"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { selectLanguageByUserId, updateCurrentLevelByUserId, insertLanguage, } = require("../model/languagesModel");
exports.postLanguage = (req, res, next) => {
    insertLanguage()
        .then((language) => {
        res.status(201).send({ language: language });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getLanguageByUserId = (req, res, next) => {
    const { user_id } = req.params;
    selectLanguageByUserId(user_id)
        .then((language) => {
        res.status(200).send({ language: language });
    })
        .catch((err) => {
        next(err);
    });
};
exports.patchCurrentLevelByUserId = (req, res, next) => {
    const { user_id } = req.params;
    updateCurrentLevelByUserId(user_id)
        .then((current_level) => {
        res.status(200).send({ current_level: current_level });
    })
        .catch((err) => {
        next(err);
    });
};
