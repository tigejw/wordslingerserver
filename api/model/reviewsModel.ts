import { QueryResult } from "pg";
const db = require("../../db/connection");
const format = require("pg-format");
const { checkExists } = require("../../db/seeds/utils");

export function selectReviewByUserId(user_id: string) {
  return checkExists("users", "user_id", user_id).then(() => {
    const sqlString = format(
      `SELECT words.*, user_id, german_mastery, spanish_mastery, french_mastery, 
EXTRACT(EPOCH FROM german_last_review - NOW()) as german_review_interval_sec, 
EXTRACT(EPOCH FROM spanish_last_review - NOW()) as spanish_review_interval_sec, 
EXTRACT(EPOCH FROM french_last_review - NOW()) as french_review_interval_sec 
FROM word_mastery JOIN words on word_mastery.english = words.english
WHERE user_id = %s;`,
      [user_id]
    );

    return db.query(sqlString).then((result: QueryResult<any>) => {
      const formattedGermanReviewData = result.rows.map(
        ({
          english,
          german,
          image_url,
          german_mastery,
          german_review_interval_sec,
        }) => {
          german_review_interval_sec *= -1;
          return {
            english,
            german,
            image_url,
            german_mastery,
            german_review_interval_sec,
          };
        }
      );
      const formattedSpanishReviewData = result.rows.map(
        ({
          english,
          spanish,
          image_url,
          spanish_mastery,
          spanish_review_interval_sec,
        }) => {
          spanish_review_interval_sec *= -1;
          return {
            english,
            spanish,
            image_url,
            spanish_mastery,
            spanish_review_interval_sec,
          };
        }
      );
      const formattedFrenchReviewData = result.rows.map(
        ({
          english,
          french,
          image_url,
          french_mastery,
          french_review_interval_sec,
        }) => {
          french_review_interval_sec *= -1;
          return {
            english,
            french,
            image_url,
            french_mastery,
            french_review_interval_sec,
          };
        }
      );
      return {
        germanReviewData: formattedGermanReviewData,
        spanishReviewData: formattedSpanishReviewData,
        frenchReviewData: formattedFrenchReviewData,
      };
    });
  });
}

export function updateWordMasteryByUserID(
  user_id: string,
  english: string,
  target_language: string,
  new_mastery: string
) {
  return checkExists("users", "user_id", user_id).then(() => {
    let language_mastery;
    let language_last_review;
    switch (target_language) {
      case "german":
        language_mastery = "german_mastery";
        language_last_review = "german_last_review";
        break;
      case "spanish":
        language_mastery = "spanish_mastery";
        language_last_review = "spanish_last_review";
        break;
      case "french":
        language_mastery = "french_mastery";
        language_last_review = "french_last_review";
        break;
      default:
        return Promise.reject({ status: 400, msg: "Bad request!" });
    }
    if (english === undefined || new_mastery === undefined) {
      return Promise.reject({ status: 400, msg: "Bad request!" });
    }

    const sqlString = format(
      `UPDATE word_mastery
      SET %I = $1,
      %I = NOW()
      WHERE user_id = $2 and english = $3
      RETURNING *`,
      language_mastery,
      language_last_review
    );
    return db
      .query(sqlString, [new_mastery, user_id, english])
      .then((result: QueryResult<any>) => {
        return result.rows[0];
      });
  });
}
