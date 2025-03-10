const request = require("supertest");
const app = require("../index");
const seed = require("../../db/seeds/seed.ts");
const connection = require("../../db/connection");
const data = require("../../db/data/testData/index");
import { Game, User, Language, Word, Username } from "@/types";
const { frenchTestWords } = require("./wordsFrench");
const { spainishTestWords } = require("./wordsSpanish");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return connection.end();
});

type UsersResponse = { body: { users: User[] } };
type UserResponse = { body: { user: User[] } };
type GameResponse = { body: { game: Game } };
type WordResponse = { body: { words: Word[] } };
type ErrorResponse = { body: { error: string } };
type VerificationResponse = { body: { verification: Boolean } };
type LanguageResponse = { body: { language: Language[] } };
type UsernameResponse = { body: { user: Username } };

//user tests

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
        password: "iamacat",
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
  //describe("PATCH /users/:user_id", () => {});
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

//language tests

describe.only("/languages", () => {
  describe("GET /language/:user_id", () => {
    test("get the languages of a user", () => {
      return request(app)
        .get("/api/language/2")
        .expect(200)
        .then(({ body: { language } }: LanguageResponse) => {
          expect(Array.isArray(language)).toBe(true);
          language.map((user) => {
            expect(typeof user.current_level).toEqual("number");
            expect(typeof user.language).toEqual("string");
          });
        });
    });
  });
  describe("POST /langugage/:user_id", () => {
    test("", () => {
      return request(app)
        .post("/api/language/2")
        .send({ language: "French", user_id: 2 })
        .expect(201)
        .then(({ body }: any) => {
          expect(body[0].language).toEqual("French");
          expect(body[0].user_id).toEqual(2);
          expect(body[0].current_level).toEqual(1);
        });
    });
  });
  //   describe("PATCH /language/:user_id", () => {});
  // });
});

//game tests

describe("/games", () => {
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

      test("400: wordlist is not valid type", () => {
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

      test("400: winner_correct_answers is not valid type", () => {
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

      test("400: loser_correct_answers is not valid type", () => {
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

      test("404: user ID for winner is not valid type", () => {
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
      test("404: user ID for winner is valid type but does not exist", () => {
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

    test("404: user ID for loser is valid type but does not exist", () => {
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

describe("/verify", () => {
  describe.only("/POST /verify", () => {
    test("should return 200 and true when passed a valid username and password", () => {
      return request(app)
        .post("/api/verify")
        .send({ username: "Hayley41", password: "shhhhissasecret" })
        .expect(200)
        .then(({ body: { verification } }: VerificationResponse) => {
          expect(verification).toBe(true);
        });
    });
    test("should return 200 and false when passed a valid username and invalid password", () => {
      return request(app)
        .post("/api/verify")
        .send({ username: "Hayley41", password: "nuHUH" })
        .expect(200)
        .then(({ body: { verification } }: VerificationResponse) => {
          expect(verification).toBe(false);
        });
    });
    test("should return 400 when passed an invalid username type", () => {
      return request(app)
        .post("/api/verify")
        .send({ username: 314, password: "shhhhissasecret" })
        .expect(400)
        .then(({ body: { error } }: ErrorResponse) => {
          expect(error).toBe("Bad request!");
        });
    });
    test("should return 404 when passed a valid username type that does not exist", () => {
      return request(app)
        .post("/api/verify")
        .send({ username: "noYOURNOTREAL", password: "shhhhissasecret" })
        .expect(404)
        .then(({ body: { error } }: ErrorResponse) => {
          expect(error).toBe("Not found!");
        });
    });
    test("should return 400 when passed a valid username and no password", () => {
      return request(app)
        .post("/api/verify")
        .send({ username: "Hayley41" })
        .expect(400)
        .then(({ body: { error } }: ErrorResponse) => {
          expect(error).toBe("Bad request!");
        });
    });
  });
});

describe("GET REQUESTS", () => {
  describe("GET - /word-list", () => {
    test("200: Responds with every word from all available languages with their corresponding level ", () => {
      return request(app)
        .get("/api/word-list/")
        .expect(200)
        .then(({ body: { words } }: WordResponse) => {
          expect(words).toEqual(data.wordsData);
        });
    });
    test("404: Responds with a 404 when an incorrect pathway is given ", () => {
      return request(app)
        .get("/api/vords/")
        .expect(404)
        .then(({ body: { error } }: ErrorResponse) => {
          expect(error).toBe("Invalid URL!");
        });
    });
  });
  describe("GET - /word-list/:targetLanguage", () => {
    test("200: Responds with all available french words with their corresponding level ", () => {
      const user = {
        user_id: 12,
        username: "helloMartha",
        name: "Martha",
        usersLanguage: "english",
        role: "user",
        bio: "I would like to live in France in the future",
      };
      return request(app)
        .get("/api/word-list/french")
        .send(user)
        .expect(200)
        .then(({ body: { words } }: WordResponse) => {
          expect(words).toEqual(frenchTestWords);
        });
    });

    describe("GET - /word-list/french", () => {
      test("200: Responds with all available Spanish words with their corresponding level  ", () => {
        const user = {
          user_id: 12,
          username: "sol",
          name: "Rico",
          usersLanguage: "english",
          role: "user",
          bio: "Getting back into my spanish roots",
        };
        return request(app)
          .get("/api/word-list/spanish")
          .send(user)
          .expect(200)
          .then(({ body: { words } }: WordResponse) => {
            expect(words).toEqual(spainishTestWords);
          });
      });
    });
    describe("GET - select words in the users target langaugae from the speicifed level", () => {
      test("200: Responds with all available Spanish words with their corresponding level  ", () => {
        const user = {
          user_id: 12,
          username: "bandOnTheWall",
          name: "Merkal",
          usersLanguage: "english",
          role: "user",
          bio: "Bort",
        };

        const selectedLevel = 7;

        const wordsLevelSeven = [
          {
            german: "tanzen",
          },
          {
            german: "zeichnen",
          },
          {
            german: "spielen",
          },
          {
            german: "laufen",
          },
          {
            german: "singen",
          },
        ];

        return request(app)
          .get("/api/word-list/german/level-7")
          .send({ user, selectedLevel })
          .expect(200)
          .then(({ body: { words } }: WordResponse) => {
            expect(words).toEqual(wordsLevelSeven);
          });
      });
    });
  });
});
