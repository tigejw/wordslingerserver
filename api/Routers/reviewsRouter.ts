import { getReviewsByUserID } from "../controllers/reviewsController";

const reviewsRouter = require("express").Router();

reviewsRouter.route("/:user_id").get(getReviewsByUserID);

export default reviewsRouter;
