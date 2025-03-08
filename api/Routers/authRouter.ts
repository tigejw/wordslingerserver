const authRouter = require("express").Router();
const { authUser } = require("../controllers/authController");

authRouter.route("/").post(authUser);

export default authRouter;
