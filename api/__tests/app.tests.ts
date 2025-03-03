const request = require("supertest");
const app = require("../index");

// const seed = require(seed.js)
// const db = require(connection.js)
// const {testdata} =
beforeEach(() => {
  return seed({ testdata });
});

afterAll(() => {
  return db.end();
});

describe("/users", () => {
  describe("GET /users", () => {});
  describe("GET /users/:user_id", () => {});
  describe("POST /users", () => {});
  describe("PATCH /users/:user_id", () => {});
  describe("DELETE /users/:user_id", () => {});
});

describe("/languages", () => {
  describe("GET /language/:user_id", () => {});
  describe("PATCH /language/:user_id", () => {});
  describe("POST /langugage", () => {});
});

describe("/words", () => {
  describe("GET /languages", () => {
    describe("Queries by language, level and english word", () => {});
  });
});
