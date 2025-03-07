const gameRouter = require("express").Router();
const { postGame } = require("../controllers/gameController");

gameRouter.route("/").post(postGame);

export default gameRouter;
