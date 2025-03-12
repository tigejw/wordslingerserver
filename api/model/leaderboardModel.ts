import { ValidLanguage, Leaderboard } from "@/types";
import languageRouter from "../Routers/languageRouters";
import { QueryResult } from "pg";

const db = require("../../db/connection");
const { checkExists } = require("../../db/seeds/utils");

exports.selectLeaderboardEntryByUserIdAndLanguage = (
  user_id: number,
  language: "German" | "Spanish" | "French"
) => {
  if (
    language !== "German" &&
    language !== "Spanish" &&
    language !== "French"
  ) {
    console.log("this langauge failed if " + language);
    return Promise.reject({
      status: 400,
      msg: "Bad request!",
    });
  }
  return checkExists("users", "user_id", user_id)
    .then(() => {
      return db.query(
        "SELECT * FROM leaderboard WHERE user_id = $1 AND language = $2",
        [user_id, language]
      );
    })
    .then(({ rows }: { rows: any }) => {
      return rows[0];
    });
};

exports.updateLeaderboardEntryByUserIdAndLanguage = (
  user_id: number,
  language: "German" | "Spanish" | "French",
  newRank: number
) => {
  if (
    language !== "German" &&
    language !== "Spanish" &&
    language !== "French"
  ) {
    console.log("this langauge failed if " + language);
    return Promise.reject({
      status: 400,
      msg: "Bad request!",
    });
  }
  if (typeof newRank !== "number" || !newRank) {
    return Promise.reject({
      status: 400,
      msg: "Bad request!",
    });
  }
  return checkExists("users", "user_id", user_id)
    .then(() => {
      return db.query(
        "UPDATE leaderboard SET rank = $1 WHERE user_id = $2 AND language = $3 RETURNING *",
        [newRank, user_id, language]
      );
    })
    .then(({ rows }: { rows: any }) => {
      console.log(rows);
      return rows[0].rank;
    });
};

exports.selectAllLeaderboardEntries = () => {
  return db
    .query("SELECT * FROM leaderboard")
    .then(({ rows }: { rows: Array<Leaderboard> }) => {
      return rows;
    });
};

exports.insertNewLeaderboardEntry = (
  user_id: Number,
  language: ValidLanguage
) => {
  if (!user_id || !language) {
    return Promise.reject({
      status: 400,
      msg: "Bad request!",
    });
  }
  return checkExists("users", "user_id", user_id)
    .then(() => {
      return db.query(
        "INSERT into leaderboard (user_id, rank, language) VALUES ($1, $2, $3) RETURNING *",
        [user_id, 200, language]
      );
    })
    .then((result: QueryResult<Leaderboard>) => {
      return result.rows[0];
    });
};
