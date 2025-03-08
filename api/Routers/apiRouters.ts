const apiRouter = require("express").Router();
import usersRouter from "./userRoutes";
import languageRouter from "./languageRouters";
import wordsRouter from "./wordsRouter";

apiRouter.use("/users", usersRouter);
apiRouter.use("/language", languageRouter);
apiRouter.use("/words", wordsRouter);

module.exports = apiRouter;
