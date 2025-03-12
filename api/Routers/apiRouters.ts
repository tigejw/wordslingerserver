const apiRouter = require("express").Router();
import usersRouter from "./userRoutes";
import languageRouter from "./languageRouters";
import wordsRouter from "./wordsRouter";
import gameRouter from "./gameRouters";
import verifyRouter from "./verifyRouter";
import reviewsRouter from "./reviewsRouter";

apiRouter.use("/users", usersRouter);
apiRouter.use("/language", languageRouter);
apiRouter.use("/games", gameRouter);
apiRouter.use("/word-list", wordsRouter);
apiRouter.use("/reviews", reviewsRouter);
console.log("in apirouter");
apiRouter.use("/verify", verifyRouter);

export default apiRouter;
