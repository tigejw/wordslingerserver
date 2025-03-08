const apiRouter = require("express").Router();
import usersRouter from "./userRoutes";
import languageRouter from "./languageRouters";
import wordsRouter from "./wordsRouter";
import gameRouter from "./gameRouters";
import authRouter from "./authRouter";
apiRouter.use("/users", usersRouter);
apiRouter.use("/languages", languageRouter);
apiRouter.use("/games", gameRouter);
apiRouter.use("/word-list", wordsRouter);
apiRouter.use("/auth", authRouter);

export default apiRouter;
