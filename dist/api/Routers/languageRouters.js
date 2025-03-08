"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const languageRouter = require("express").Router();
const { getLanguageByUserId, patchCurrentLevelByUserId, postLanguage, } = require("../controllers/languagesController");
// languages
//     post language - when user starts an new language
//     get language by user_id - when we need to access current level of user/language relationship
//     update current level by user_id - when we need to update current level
languageRouter.route("/").post(postLanguage);
languageRouter
    .route("/:user_id")
    .get(getLanguageByUserId)
    .patch(patchCurrentLevelByUserId);
exports.default = languageRouter;
