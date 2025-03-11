const verifyRouter = require("express").Router();
const { verifyUser } = require("../controllers/verifyController");

verifyRouter.route("*").post(verifyUser);

export default verifyRouter;
