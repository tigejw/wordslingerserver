"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewsByUserID = getReviewsByUserID;
const reviewsModel_1 = require("../model/reviewsModel");
function getReviewsByUserID(req, res, next) {
    const { user_id } = req.params;
    (0, reviewsModel_1.selectReviewByUserId)(user_id)
        .then((reviewData) => {
        console.log(reviewData);
        res.status(200).send({ reviewData: reviewData });
    })
        .catch((err) => {
        next(err);
    });
}
