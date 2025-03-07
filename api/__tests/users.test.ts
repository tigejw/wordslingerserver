const request = require("supertest");
const app = require("../index");
const seed = require("../../db/seeds/seed.ts");
const connection = require("../../db/connection");
const data = require("../../db/data/testData/index");
import { Game, User, Language } from "@/types";

beforeEach(() => {
  jest.setTimeout(215000);
  return seed(data);
});

afterAll(() => {
  return connection.end();
});

type error = {
  status: number;
  msg: string;
};

type UsersResponse = { body: { users: User[] } };
type UserResponse = { body: { user: User[] } };
type GameResponse = { body: { game: Game } };
type ErrorResponse = { body: { error: error } };

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

  describe("DELETE /users/:user_id", () => {
    test("204: Responds with a 204 and nothing", () => {
      return request(app).delete("/api/users/1").expect(204);
    });
  });

  type LanguageResponse = { body: { language: Language[] } };
  //type LanguageResponse = { body: { user: Language[] } };
  describe.only("/languages", () => {
    describe("GET /language/:user_id", () => {
      test("get the languages of a user", () => {
        return request(app)
          .get("/api/language/2")
          .expect(200)
          .then(({ body: { language } }: LanguageResponse) => {
            console.log(language);
            expect(Array.isArray(language)).toBe(true);
          });
      });
    });
  });
  describe("POST /langugage/:user_id", () => {});
  describe("PATCH /language/:user_id", () => {});
});

describe.only("/games", () => {
  describe("POST /games", () => {
    test("should return a 201 and posted data", () => {
      return request(app)
        .post("/api/games")
        .send({
          room_id: "testroomid5",
          winner: 1,
          loser: 2,
          wordlist: ["apple", "banana", "orange"],
          winner_correct_answers: ["apple", "banana"],
          loser_correct_answers: ["apple"],
        })
        .expect(201)
        .then(({ body: { game } }: GameResponse) => {
          expect(game).toEqual(
            expect.objectContaining({
              room_id: "testroomid5",
              winner: 1,
              loser: 2,
              wordlist: ["apple", "banana", "orange"],
              winner_correct_answers: ["apple", "banana"],
              loser_correct_answers: ["apple"],
              match_date: expect.any(String),
            })
          );
        });
    });

    describe.only("POST /games error handling", () => {
      test("400: room_id is missing", () => {
        return request(app)
          .post("/api/games")
          .send({
            winner: 1,
            loser: 2,
            wordlist: ["apple", "banana", "orange"],
            winner_correct_answers: ["apple", "banana"],
            loser_correct_answers: ["apple"],
          })
          .expect(400)
          .then(({ body: { error } }: ErrorResponse) => {
            expect(error).toEqual("Bad request!");
          });
      });

      test("400: winner is missing", () => {
        return request(app)
          .post("/api/games")
          .send({
            room_id: "testroomid5",
            loser: 2,
            wordlist: ["apple", "banana", "orange"],
            winner_correct_answers: ["apple", "banana"],
            loser_correct_answers: ["apple"],
          })
          .expect(400)
          .then(({ body: { error } }: ErrorResponse) => {
            expect(error).toEqual("Bad request!");
          });
      });

      test("400: loser is missing", () => {
        return request(app)
          .post("/api/games")
          .send({
            room_id: "testroomid5",
            winner: 1,
            wordlist: ["apple", "banana", "orange"],
            winner_correct_answers: ["apple", "banana"],
            loser_correct_answers: ["apple"],
          })
          .expect(400)
          .then(({ body: { error } }: ErrorResponse) => {
            expect(error).toEqual("Bad request!");
          });
      });

      test("400: wordlist is not an array", () => {
        return request(app)
          .post("/api/games")
          .send({
            room_id: "testroomid5",
            winner: 1,
            loser: 2,
            wordlist: "notAnArray",
            winner_correct_answers: ["apple", "banana"],
            loser_correct_answers: ["apple"],
          })
          .expect(400)
          .then(({ body: { error } }: ErrorResponse) => {
            expect(error).toEqual("Bad request!");
          });
      });

      test("400: winner_correct_answers is null", () => {
        return request(app)
          .post("/api/games")
          .send({
            room_id: "testroomid5",
            winner: 1,
            loser: 2,
            wordlist: ["apple", "banana", "orange"],
            winner_correct_answers: null,
            loser_correct_answers: ["apple"],
          })
          .expect(400)
          .then(({ body: { error } }: ErrorResponse) => {
            expect(error).toEqual("Bad request!");
          });
      });

      test("400: loser_correct_answers is null", () => {
        return request(app)
          .post("/api/games")
          .send({
            room_id: "testroomid5",
            winner: 1,
            loser: 2,
            wordlist: ["apple", "banana", "orange"],
            winner_correct_answers: ["apple", "banana"],
            loser_correct_answers: null,
          })
          .expect(400)
          .then(({ body: { error } }: ErrorResponse) => {
            expect(error).toEqual("Bad request!");
          });
      });

      test("404: user ID for winner is not valid", () => {
        return request(app)
          .post("/api/games")
          .send({
            room_id: "testroomid5",
            winner: "rawr IM THE WINNER NOW",
            loser: 2,
            wordlist: ["apple", "banana", "orange"],
            winner_correct_answers: ["apple", "banana"],
            loser_correct_answers: ["apple"],
          })
          .expect(400)
          .then(({ body: { error } }: ErrorResponse) => {
            expect(error).toEqual("Bad request!");
          });
      });
      test("404: user ID for winner is valid but does not exist", () => {
        return request(app)
          .post("/api/games")
          .send({
            room_id: "testroomid5",
            winner: 3141592,
            loser: 2,
            wordlist: ["apple", "banana", "orange"],
            winner_correct_answers: ["apple", "banana"],
            loser_correct_answers: ["apple"],
          })
          .expect(404)
          .then(({ body: { error } }: ErrorResponse) => {
            expect(error).toEqual("Not found!");
          });
      });

      test("404: user ID for is not valid type", () => {
        return request(app)
          .post("/api/games")
          .send({
            room_id: "testroomid5",
            winner: 1,
            loser: "NO I DONT WANT TO LOSE",
            wordlist: ["apple", "banana", "orange"],
            winner_correct_answers: ["apple", "banana"],
            loser_correct_answers: ["apple"],
          })
          .expect(400)
          .then(({ body: { error } }: ErrorResponse) => {
            expect(error).toEqual("Bad request!");
          });
      });
    });

    test("404: user ID for loser is valid does not exist", () => {
      return request(app)
        .post("/api/games")
        .send({
          room_id: "testroomid5",
          winner: 1,
          loser: 3141592,
          wordlist: ["apple", "banana", "orange"],
          winner_correct_answers: ["apple", "banana"],
          loser_correct_answers: ["apple"],
        })
        .expect(404)
        .then(({ body: { error } }: ErrorResponse) => {
          expect(error).toEqual("Not found!");
        });
    });
  });
});
