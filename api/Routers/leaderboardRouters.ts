const leaderboardRouter = require("express").Router();
const {getLeaderboardEntryByUserIdAndLanguage} = require("../controllers/leaderboardController");

leaderboardRouter.route("/:user_id/:language").get(getLeaderboardEntryByUserIdAndLanguage);

export default leaderboardRouter;
