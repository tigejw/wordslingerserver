"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reviewsController_1 = require("../controllers/reviewsController");
const reviewsRouter = require("express").Router();
reviewsRouter
    .route("/:user_id")
    .get(reviewsController_1.getReviewsByUserID)
    .patch(reviewsController_1.patchWordMasteryByUserID);
exports.default = reviewsRouter;
