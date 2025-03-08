const verifyRouter = require("express").Router();
const { verifyUser } = require("../controllers/verifyController");
console.log("in verifyrouter")
verifyRouter.route("/").post(verifyUser);

export default verifyRouter;
