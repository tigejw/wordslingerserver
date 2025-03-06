const request = require("supertest");
const app = require("../index");
import { beforeEach } from "node:test";
const { selectUsers } = require("../../api/model/userModel");
const seedDatabase = require("../../db/seeds/run-seed.ts");
const connection = require("../../db/connection");
const data = require("../../db/data/testData/index");

// beforeEach(() => {
//   return seedDatabase(data);
// });

// afterAll(() => {
//   return connection.end();
// });

describe("/words", () => {
  describe("GET /languages", () => {
    describe("Queries by language, level and english word", () => {});
  });
});
