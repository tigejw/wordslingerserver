const leaderboardRouter = require("express").Router();
const {
  getLeaderboardEntryByUserIdAndLanguage,
  patchLeaderboardEntryByUserIdAndLanguage,
} = require("../controllers/leaderboardController");

leaderboardRouter
  .route("/:user_id/:language")
  .get(getLeaderboardEntryByUserIdAndLanguage)
  .patch(patchLeaderboardEntryByUserIdAndLanguage);

export default leaderboardRouter;
