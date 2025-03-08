const db = require("../connection");
const format = require("pg-format");

exports.checkExists = (table: any, column: any, value: any) => {
  return db
    .query(format("SELECT * FROM %I WHERE %I = $1", table, column), [value])
    .then(({ rows }: any) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found!" });
      } else {
        return "It's alive!";
      }
    });
};
