import { Request, Response, NextFunction } from "express";
import { selectReviewByUserId } from "../model/reviewsModel";
import { ReviewData } from "@/types";

function getReviewsByUserID(req: Request, res: Response, next: NextFunction) {
  const { user_id } = req.params;
  selectReviewByUserId(user_id)
    .then((reviewData: ReviewData) => {
      console.log(reviewData);

      res.status(200).send({ reviewData: reviewData });
    })
    .catch((err: any) => {
      next(err);
    });
}

export { getReviewsByUserID };
