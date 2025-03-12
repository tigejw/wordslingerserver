import { Request, Response, NextFunction } from "express";
import {
  selectReviewByUserId,
  updateWordMasteryByUserID,
} from "../model/reviewsModel";
import { ReviewData, UpdatedMastery } from "@/types";

function getReviewsByUserID(req: Request, res: Response, next: NextFunction) {
  const { user_id } = req.params;
  selectReviewByUserId(user_id)
    .then((reviewData: ReviewData) => {
      res.status(200).send({ reviewData: reviewData });
    })
    .catch((err: any) => {
      next(err);
    });
}
function patchWordMasteryByUserID(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { user_id } = req.params;
  const { english, target_language, new_mastery } = req.body;

  updateWordMasteryByUserID(user_id, english, target_language, new_mastery)
    .then((updatedMastery: UpdatedMastery) => {
      res.status(200).send({ updatedMastery: updatedMastery });
    })
    .catch((err: any) => {
      next(err);
    });
}
export { getReviewsByUserID, patchWordMasteryByUserID };
