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
type UserResponse = { body: { user: User[] } };
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

  describe("GET /users/:user_id", () => {
    test("200: Responds with a user object", () => {
      return request(app)
        .get("/api/users/1")
        .expect(200)
        .then(({ body: { user } }: UserResponse) => {
          console.log(user, "response in user id");
          expect(Array.isArray(user)).toBe(true);
          expect(user[0].user_id).toEqual(1);
        });
    });
  });
  describe("POST /users", () => {
    test("201: Responds with the posted comment", () => {
      const newUser = {
        name: "Bercow",
        avatar_url:
          "https://i.guim.co.uk/img/media/c5e73ed8e8325d7e79babf8f1ebbd9adc0d95409/2_5_1754_1053/master/1754.jpg?width=465&dpr=1&s=none&crop=none",
        role: "user",
        bio: "cat, speaker, meowmrow",
        username: "Stinkyboy",
      };
      return request(app)
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .then(({ body: { user } }: any) => {
          expect(user[0].username).toEqual("Stinkyboy");
          expect(typeof user[0].user_id).toEqual("number");
        });
    });
  });
  describe("PATCH /users/:user_id", () => {});

  describe("DELETE /users/:user_id", () => {
    test("204: Responds with a 204 and nothing", () => {
      return request(app).delete("/api/users/1").expect(204);
    });
  });

  describe("/languages", () => {
    describe("GET /language/:user_id", () => {});
    describe("PATCH /language/:user_id", () => {});
    describe("POST /langugage", () => {});
  });
});
