const apiRouter = require("express").Router();
import usersRouter from "./userRoutes";
import languageRouter from "./languageRouters";
import wordsRouter from "./wordsRouter";
import gameRouter from "./gameRouters";
import verifyRouter from "./verifyRouter";
import reviewsRouter from "./reviewsRouter";
import leaderboardRouter from "./leaderboardRouters";

apiRouter.use("/users", usersRouter);
apiRouter.use("/language", languageRouter);
apiRouter.use("/games", gameRouter);
apiRouter.use("/word-list", wordsRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/verify", verifyRouter);
apiRouter.use("/leaderboard", leaderboardRouter);

export default apiRouter;
