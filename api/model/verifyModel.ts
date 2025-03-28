const db = require("../../db/connection");
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
  return db
    .query(
      `SELECT username FROM users WHERE username = $1 AND password = crypt($2, password)`,
      [username, password]
    )
    .then(({ rows }: { rows: any }) => {
      return rows.length > 0;
    });
};
