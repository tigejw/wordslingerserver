const request = require("supertest");
const app = require("../index");
import { beforeEach } from "node:test"; 

const seedDatabase = require("../../db/seeds/seed.js");
const connection = require("../../db/connection");

const {achievementsData, friendsData, gamesData, languagesData, leaderboardData, usersData, word_masteryData, wordsData} = require("../../db/data/testData/index")

beforeEach(() => {
  return seedDatabase({});
});

afterAll(() => {
  return connection.end();
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
