const request = require("supertest");
const app = require("../index");
const { selectUsers } = require("../../api/model/userModel");
const seed = require("../../db/seeds/seed.ts");
const connection = require("../../db/connection");
const data = require("../../db/data/testData/index");
import { Game, User } from "@/types";
beforeEach(() => {
  jest.setTimeout(215000);
  return seed(data);
});

afterAll(() => {
  return connection.end();
});
type error = {
  status: number;
  message: string;
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
    });
  });
  describe("PATCH /users/:user_id", () => {});

  describe.skip("DELETE /users/:user_id", () => {
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

    describe("POST /games error handling", () => {
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
            expect(error.message).toEqual("Bad request!");
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
            expect(error.message).toEqual("Bad request!");
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
            expect(error.message).toEqual("Bad request!");
          });
      });

      test.only("400: wordlist is not an array", () => {
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
            expect(error.message).toEqual("Bad request!");
          });
      });

      test.only("400: winner_correct_answers is null", () => {
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
            expect(error.message).toEqual("Bad request!");
          });
      });

      test.only("400: loser_correct_answers is null", () => {
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
            expect(error.message).toEqual("Bad request!");
          });
      });

      test.only("404: user ID for winner does not exist", () => {
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

      test.only("404: user ID for loser does not exist", () => {
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
            expect(error.message).toEqual("Not found!");
          });
      });
    });
  });
});
