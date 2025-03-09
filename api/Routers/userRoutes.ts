const usersRouter = require("express").Router();
const {
  getUsers,
  postUser,
  getUser,
  patchUserByUserId,
  deleteUserByUserId,
} = require("../controllers/userController");

usersRouter.route("/").get(getUsers).post(postUser);

usersRouter
  .route("/:user")
  .get(getUser)
  // .patch(patchUserByUserId)
  .delete(deleteUserByUserId);

export default usersRouter;
