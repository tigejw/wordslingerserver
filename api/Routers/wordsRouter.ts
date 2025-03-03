const wordsRouter = require("express").Router();
const { getWords } = require("../controllers/wordsControllers");

wordsRouter.route("/").get(getWords);

export default wordsRouter;
