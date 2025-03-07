const wordsRouter = require("express").Router();
const { words_index } = require("../controllers/wordsControllers");

wordsRouter.get("/", words_index);

export default wordsRouter;
