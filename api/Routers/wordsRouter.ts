const wordsRouter = require("express").Router();
const {
  words_index,
  words_targetLanguage,
  words_level,
  words_game,
} = require("../controllers/wordsControllers");

wordsRouter.get("/:targetLanguage/game", words_game);
wordsRouter.get("/:targetLanguage/:level_id", words_level);
wordsRouter.get("/:targetLanguage", words_targetLanguage);
wordsRouter.get("/", words_index);

export default wordsRouter;
