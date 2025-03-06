const request = require("supertest");
const app = require("../index");
const { selectUsers } = require("../../api/model/userModel");
const seed = require("../../db/seeds/seed.ts");
const connection = require("../../db/connection");
const data = require("../../db/data/testData/index");
import { User } from "@/types";

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return connection.end();
});

type UsersResponse = { body: { users: User[] } };

describe("/users", () => {
  describe("GET /users", () => {
    test("get users", () => {
      return request(app)
        .get("/api/users/")
        .expect(200)
        .then(({ body: { users } }: UsersResponse) => {
          expect(Array.isArray(users)).toBe(true);
        });
    });
  });

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
