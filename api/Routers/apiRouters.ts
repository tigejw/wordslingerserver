const apiRouter = require("express").Router();
import usersRouter from "./userRoutes";
import languageRouter from "./languageRouters";
import wordsRouter from "./wordsRouter";
import gameRouter from "./gameRouters";
apiRouter.use("/users", usersRouter);
apiRouter.use("/languages", languageRouter);
apiRouter.use("/games", gameRouter);
apiRouter.use("/word-list", wordsRouter);


module.exports = apiRouter;
