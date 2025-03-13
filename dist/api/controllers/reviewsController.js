"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewsByUserID = getReviewsByUserID;
exports.patchWordMasteryByUserID = patchWordMasteryByUserID;
const reviewsModel_1 = require("../model/reviewsModel");
function getReviewsByUserID(req, res, next) {
    const { user_id } = req.params;
    (0, reviewsModel_1.selectReviewByUserId)(user_id)
        .then((reviewData) => {
        res.status(200).send({ reviewData: reviewData });
    })
        .catch((err) => {
        next(err);
    });
}
function patchWordMasteryByUserID(req, res, next) {
    const { user_id } = req.params;
    const { english, target_language, new_mastery } = req.body;
    (0, reviewsModel_1.updateWordMasteryByUserID)(user_id, english, target_language, new_mastery)
        .then((updatedMastery) => {
        res.status(200).send({ updatedMastery: updatedMastery });
    })
        .catch((err) => {
        next(err);
    });
}
