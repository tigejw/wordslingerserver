const db = require("../../db/connection");
const { checkExists } = require("../../db/seeds/utils");
exports.verifyUsernameAndPassword = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  if (
    !username ||
    !password ||
    typeof username !== "string" ||
    typeof password !== "string"
  ) {
    return Promise.reject({
      status: 400,
      msg: "Bad request!",
    });
  }
  console.log("in verifymodel");
  return db
    .query(
      `SELECT username FROM users WHERE username = $1 AND password = crypt($2, password)`,
      [username, password]
    )
    .then(({ rows }: { rows: any }) => {
      console.log("in verifymodel after db req");
      return rows.length > 0;
    });
};
