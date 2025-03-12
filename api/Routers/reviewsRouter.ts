import {
  getReviewsByUserID,
  patchWordMasteryByUserID,
} from "../controllers/reviewsController";

const reviewsRouter = require("express").Router();

reviewsRouter
  .route("/:user_id")
  .get(getReviewsByUserID)
  .patch(patchWordMasteryByUserID);

export default reviewsRouter;
