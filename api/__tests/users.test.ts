const request = require("supertest");
const app = require("../index");
const seed = require("../../db/seeds/seed.ts");
const connection = require("../../db/connection");
const data = require("../../db/data/testData/index");
import { Language, User, Username, Userid } from "@/types";

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return connection.end();
});

//user tests

type UsersResponse = { body: { users: User[] } };
type UserResponse = { body: { user: User[] } };
type UsernameResponse = { body: { user: Username } };

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
        .then(({ body: { user } }: any) => {
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
        .then(({ body: { user } }: UserResponse) => {
          expect(user[0].username).toEqual("Stinkyboy");
          expect(typeof user[0].user_id).toEqual("number");
        });
    });
  });
  describe("PATCH /users/:user_id", () => {});

  describe("GET /users/:username", () => {
    test("200: Responds with a user object containing the user_id", () => {
      return request(app)
        .get("/api/users/Hayley41")
        .expect(200)
        .then(({ body: { user } }: UsernameResponse) => {
          expect(Array.isArray(user)).toBe(true);
          expect(user[0]).toEqual({ user_id: 2 });
        });
    });
  });

  describe("DELETE /users/:user_id", () => {
    test("204: Responds with a 204 and nothing", () => {
      return request(app).delete("/api/users/1").expect(204);
    });
  });
});

type LanguageResponse = { body: { language: Language[] } };
//type LanguageResponse = { body: { user: Language[] } };

describe("/languages", () => {
  describe("GET /language/:user_id", () => {
    test("get the languages of a user", () => {
      return request(app)
        .get("/api/language/2")
        .expect(200)
        .then(({ body: { language } }: LanguageResponse) => {
          console.log(language);
          expect(Array.isArray(language)).toBe(true);
          language.map((user) => {
            expect(typeof user.current_level).toEqual("number");
            expect(typeof user.language).toEqual("string");
          });
        });
    });
  });
});

describe.only("POST /langugage/:user_id", () => {
  test("", () => {
    return request(app)
      .post("/api/language/2")
      .send({ language: "French", user_id: 2 })
      .expect(201)
      .then(({ body: { language } }: LanguageResponse) => {
        console.log(language);
      });
  });
});

//   describe("PATCH /language/:user_id", () => {});
// });
