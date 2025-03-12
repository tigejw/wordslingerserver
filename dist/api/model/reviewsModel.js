"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectReviewByUserId = selectReviewByUserId;
const db = require("../../db/connection");
const format = require("pg-format");
const { checkExists } = require("../../db/seeds/utils");
function selectReviewByUserId(user_id) {
    return checkExists("users", "user_id", user_id).then(() => {
        const sqlString = format(`SELECT words.*, user_id, german_mastery, spanish_mastery, french_mastery, 
EXTRACT(EPOCH FROM german_last_review - NOW()) as german_review_interval_sec, 
EXTRACT(EPOCH FROM spanish_last_review - NOW()) as spanish_review_interval_sec, 
EXTRACT(EPOCH FROM french_last_review - NOW()) as french_review_interval_sec 
FROM word_mastery JOIN words on word_mastery.english = words.english
WHERE user_id = %s;`, [user_id]);
        return db.query(sqlString).then((result) => {
            const formattedGermanReviewData = result.rows.map(({ english, german, image_url, german_mastery, german_review_interval_sec, }) => {
                german_review_interval_sec *= -1;
                return {
                    english,
                    german,
                    image_url,
                    german_mastery,
                    german_review_interval_sec,
                };
            });
            const formattedSpanishReviewData = result.rows.map(({ english, spanish, image_url, spanish_mastery, spanish_review_interval_sec, }) => {
                spanish_review_interval_sec *= -1;
                return {
                    english,
                    spanish,
                    image_url,
                    spanish_mastery,
                    spanish_review_interval_sec,
                };
            });
            const formattedFrenchReviewData = result.rows.map(({ english, french, image_url, french_mastery, french_review_interval_sec, }) => {
                french_review_interval_sec *= -1;
                return {
                    english,
                    french,
                    image_url,
                    french_mastery,
                    french_review_interval_sec,
                };
            });
            return {
                germanReviewData: formattedGermanReviewData,
                spanishReviewData: formattedSpanishReviewData,
                frenchReviewData: formattedFrenchReviewData,
            };
        });
    });
}
