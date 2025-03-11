const gameRouter = require("express").Router();
const { postGame, getGamesByUser } = require("../controllers/gameController");

gameRouter.route("/").post(postGame);

gameRouter.route("/:user_id").get(getGamesByUser);

export default gameRouter;
