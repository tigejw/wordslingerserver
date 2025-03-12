const request = require("supertest");
const app = require("../index");
const seed = require("../../db/seeds/seed.ts");
const connection = require("../../db/connection");
const data = require("../../db/data/testData/index");
import { Game, User, Language, Word, Username, Leaderboard } from "@/types";
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
type LeaderboardResponse = { body: { leaderboardEntry: Leaderboard } };
type UpdatedRankResponse = { body: { updatedRank: number } };
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
          expect(typeof user[0].user_id).toEqual("number");
        });
    });
    test("404: Responds with an error if user_id does not exist", () => {
      return request(app)
        .get("/api/users/100000")
        .expect(404)
        .then(({ body: { error } }: ErrorResponse) => {
          expect(error).toEqual("Not found!");
        });
    });
  });
  describe("POST /users", () => {
    test("201: Responds with the posted comment", () => {
      const newUser = {
        name: "Bercow",
        avatar_url:
          "https://i.guim.co.uk/img/media/c5e73ed8e8325d7e79babf8f1ebbd9adc0d95409/2_5_1754_1053/master/1754.jpg?width=465&dpr=1&s=none&crop=none",
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

    test("400: An empty post responds with an error", () => {
      return request(app)
        .post("/api/users")
        .send()
        .expect(400)
        .then(({ body: { error } }: ErrorResponse) => {
          expect(error).toEqual("Bad request!");
        });
    });
    test("400: A post with missing data responds with an error", () => {
      const newUser = {
        avatar_url:
          "https://i.guim.co.uk/img/media/c5e73ed8e8325d7e79babf8f1ebbd9adc0d95409/2_5_1754_1053/master/1754.jpg?width=465&dpr=1&s=none&crop=none",
        bio: "cat, speaker, meowmrow",
        password: "iamacat",
      };
      return request(app)
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .then(({ body: { error } }: ErrorResponse) => {
          expect(error).toEqual("Bad request!");
        });
    });
  });
  //describe("PATCH /users/:user_id", () => {});
  describe("GET /users/:username", () => {
    test("200: Responds with a user object containing the user_id", () => {
      return request(app)
        .get("/api/users/Hayley41")
        .expect(200)
        .then(({ body: { user } }: any) => {
          expect(Array.isArray(user)).toBe(true);
          expect(typeof user[0]).toEqual("object");
          expect(typeof user[0].user_id).toBe("number");
        });
    });
    test("404: Responds with an error when a username is not found", () => {
      return request(app)
        .get("/api/users/Haaayley41")
        .expect(404)
        .then(({ body: { error } }: ErrorResponse) => {
          expect(error).toEqual("Not found!");
        });
    });
  });
  describe("DELETE /users/:user_id", () => {
    test("204: Responds with a 204 and nothing", () => {
      return request(app).delete("/api/users/1").expect(204);
    });
    test("404: Responds with an error if user_id does not exist", () => {
      return request(app)
        .delete("/api/users/100000")
        .expect(404)
        .then(({ body: { error } }: ErrorResponse) => {
          expect(error).toEqual("Not found!");
        });
    });
  });
});

//language tests

describe("/languages", () => {
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
    test("404: Returns an error message when user does not exist", () => {
      return request(app)
        .get("/api/language/20000")
        .expect(404)
        .then(({ body: { error } }: ErrorResponse) => {
          expect(error).toEqual("Not found!");
        });
    });
  });
  describe("POST /langugage/:user_id", () => {
    test("201: Successfully add a language to a user", () => {
      return request(app)
        .post("/api/language")
        .send({ language: "French", user_id: 2 })
        .expect(201)
        .then(({ body }: any) => {
          expect(body[0].language).toEqual("French");
          expect(body[0].user_id).toEqual(2);
          expect(body[0].current_level).toEqual(1);
        });
    });
    test("404: Returns an error message when user does not exist", () => {
      return request(app)
        .post("/api/language")
        .send({ language: "French", user_id: 20000 })
        .expect(404);
    });
  });
});
//   describe("PATCH /language/:user_id", () => {});
// });

//game tests

describe("/games", () => {
  describe("POST /games", () => {
    test.only("should return a 201 and posted data", () => {
      return request(app)
        .post("/api/games")
        .send({
          room_id: "4cKJp_xZeGYrZk_2AAADZ1CIasdasdO8BjjS2eZhrUAAAB",
          loser: 5,
          winner: 2,
          winner_initial_points: 1900,
          winner_updated_points: 1904,
          loser_initial_points: 2190,
          loser_updated_points: 2185,
          language: "German",
          english_wordlist: [
            "dog",
            "mother",
            "father",
            "brother",
            "sit up",
            "chair",
            "table",
            "water",
            "eat",
            "read",
            "see",
            "sit down",
            "drink",
            "fruit",
            "book",
            "glass",
            "meat",
            "vegetable",
            "sister",
            "baby",
            "cat",
          ],
          non_english_wordlist: [
            "hund",
            "mutter",
            "vater",
            "bruder",
            "aufstehen",
            "stuhl",
            "tabelle",
            "wasser",
            "essen",
            "lesen",
            "sehen",
            "sitzen",
            "trinken",
            "obst",
            "buch",
            "glas",
            "fleisch",
            "gemüse",
            "schwester",
            "baby",
            "katze",
          ],
          winner_correct_answers: ["dog", "mother", "father"],
          loser_correct_answers: [],
        })
        .expect(201)
        .then(({ body: { game } }: GameResponse) => {
          expect(game).toEqual(
            expect.objectContaining({
              room_id: "4cKJp_xZeGYrZk_2AAADZ1CIasdasdO8BjjS2eZhrUAAAB",
              loser: 5,
              winner: 2,
              winner_initial_points: 1900,
              winner_updated_points: 1904,
              loser_initial_points: 2190,
              loser_updated_points: 2185,
              language: "German",
              english_wordlist: [
                "dog",
                "mother",
                "father",
                "brother",
                "sit up",
                "chair",
                "table",
                "water",
                "eat",
                "read",
                "see",
                "sit down",
                "drink",
                "fruit",
                "book",
                "glass",
                "meat",
                "vegetable",
                "sister",
                "baby",
                "cat",
              ],
              non_english_wordlist: [
                "hund",
                "mutter",
                "vater",
                "bruder",
                "aufstehen",
                "stuhl",
                "tabelle",
                "wasser",
                "essen",
                "lesen",
                "sehen",
                "sitzen",
                "trinken",
                "obst",
                "buch",
                "glas",
                "fleisch",
                "gemüse",
                "schwester",
                "baby",
                "katze",
              ],
              winner_correct_answers: ["dog", "mother", "father"],
              loser_correct_answers: [],
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
            loser: 5,
            winner: 2,
            winner_initial_points: 1900,
            winner_updated_points: 1904,
            loser_initial_points: 2190,
            loser_updated_points: 2185,
            language: "German",
            english_wordlist: [
              "dog",
              "mother",
              "father",
              "brother",
              "sit up",
              "chair",
              "table",
              "water",
              "eat",
              "read",
              "see",
              "sit down",
              "drink",
              "fruit",
              "book",
              "glass",
              "meat",
              "vegetable",
              "sister",
              "baby",
              "cat",
            ],
            non_english_wordlist: [
              "hund",
              "mutter",
              "vater",
              "bruder",
              "aufstehen",
              "stuhl",
              "tabelle",
              "wasser",
              "essen",
              "lesen",
              "sehen",
              "sitzen",
              "trinken",
              "obst",
              "buch",
              "glas",
              "fleisch",
              "gemüse",
              "schwester",
              "baby",
              "katze",
            ],
            winner_correct_answers: ["dog", "mother", "father"],
            loser_correct_answers: [],
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
            room_id: "4cKJp_xZeGYrZk_2AAADZ1CIasdasdO8BjjS2eZhrUAAAB",
            loser: 5,
            winner_initial_points: 1900,
            winner_updated_points: 1904,
            loser_initial_points: 2190,
            loser_updated_points: 2185,
            language: "German",
            english_wordlist: [
              "dog",
              "mother",
              "father",
              "brother",
              "sit up",
              "chair",
              "table",
              "water",
              "eat",
              "read",
              "see",
              "sit down",
              "drink",
              "fruit",
              "book",
              "glass",
              "meat",
              "vegetable",
              "sister",
              "baby",
              "cat",
            ],
            non_english_wordlist: [
              "hund",
              "mutter",
              "vater",
              "bruder",
              "aufstehen",
              "stuhl",
              "tabelle",
              "wasser",
              "essen",
              "lesen",
              "sehen",
              "sitzen",
              "trinken",
              "obst",
              "buch",
              "glas",
              "fleisch",
              "gemüse",
              "schwester",
              "baby",
              "katze",
            ],
            winner_correct_answers: ["dog", "mother", "father"],
            loser_correct_answers: [],
          })
          .expect(400)
          .then(({ body: { error } }: ErrorResponse) => {
            expect(error).toEqual("Bad request!");
          });
      });

      // test("400: wordlist is not valid type", () => {
      //   return request(app)
      //     .post("/api/games")
      //     .send({
      //       room_id: "testroomid5",
      //       winner: 1,
      //       loser: 2,
      //       wordlist: "notAnArray",
      //       winner_correct_answers: ["apple", "banana"],
      //       loser_correct_answers: ["apple"],
      //     })
      //     .expect(400)
      //     .then(({ body: { error } }: ErrorResponse) => {
      //       expect(error).toEqual("Bad request!");
      //     });
      // });

      // test("400: winner_correct_answers is not valid type", () => {
      //   return request(app)
      //     .post("/api/games")
      //     .send({
      //       room_id: "testroomid5",
      //       winner: 1,
      //       loser: 2,
      //       wordlist: ["apple", "banana", "orange"],
      //       winner_correct_answers: null,
      //       loser_correct_answers: ["apple"],
      //     })
      //     .expect(400)
      //     .then(({ body: { error } }: ErrorResponse) => {
      //       expect(error).toEqual("Bad request!");
      //     });
      // });

      // test("400: loser_correct_answers is not valid type", () => {
      //   return request(app)
      //     .post("/api/games")
      //     .send({
      //       room_id: "testroomid5",
      //       winner: 1,
      //       loser: 2,
      //       wordlist: ["apple", "banana", "orange"],
      //       winner_correct_answers: ["apple", "banana"],
      //       loser_correct_answers: null,
      //     })
      //     .expect(400)
      //     .then(({ body: { error } }: ErrorResponse) => {
      //       expect(error).toEqual("Bad request!");
      //     });
      // });

      // test("404: user ID for winner is not valid type", () => {
      //   return request(app)
      //     .post("/api/games")
      //     .send({
      //       room_id: "testroomid5",
      //       winner: "rawr IM THE WINNER NOW",
      //       loser: 2,
      //       wordlist: ["apple", "banana", "orange"],
      //       winner_correct_answers: ["apple", "banana"],
      //       loser_correct_answers: ["apple"],
      //     })
      //     .expect(400)
      //     .then(({ body: { error } }: ErrorResponse) => {
      //       expect(error).toEqual("Bad request!");
      //     });
      // });
      // test("404: user ID for winner is valid type but does not exist", () => {
      //   return request(app)
      //     .post("/api/games")
      //     .send({
      //       room_id: "testroomid5",
      //       winner: 3141592,
      //       loser: 2,
      //       wordlist: ["apple", "banana", "orange"],
      //       winner_correct_answers: ["apple", "banana"],
      //       loser_correct_answers: ["apple"],
      //     })
      //     .expect(404)
      //     .then(({ body: { error } }: ErrorResponse) => {
      //       expect(error).toEqual("Not found!");
      //     });
      // });

      //   test("404: user ID for is not valid type", () => {
      //     return request(app)
      //       .post("/api/games")
      //       .send({
      //         room_id: "testroomid5",
      //         winner: 1,
      //         loser: "NO I DONT WANT TO LOSE",
      //         wordlist: ["apple", "banana", "orange"],
      //         winner_correct_answers: ["apple", "banana"],
      //         loser_correct_answers: ["apple"],
      //       })
      //       .expect(400)
      //       .then(({ body: { error } }: ErrorResponse) => {
      //         expect(error).toEqual("Bad request!");
      //       });
      //   });
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
  describe("GET games", () => {
    test("200: get games returns an array of all of the users games", () => {
      return request(app)
        .get("/api/games/1")
        .expect(200)
        .then(({ body: { game } }: any) => {
          expect(Array.isArray(game)).toBe(true);
          expect(game.length).toEqual(4);
        });
    });
    describe("GET games Error Handling", () => {
      test("404: get games returns an error if the user does not exist", () => {
        return request(app)
          .get("/api/games/10000")
          .expect(404)
          .then(({ body: { error } }: ErrorResponse) => {
            expect(error).toBe("Not found!");
          });
      });
    });
  });
});

//verify tests

describe("/verify", () => {
  describe("/POST /verify", () => {
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
    test("should return 200 and false when passed a valid username type that does not exist", () => {
      return request(app)
        .post("/api/verify")
        .send({ username: "noYOURNOTREAL", password: "shhhhissasecret" })
        .expect(200)
        .then(({ body: { verification } }: VerificationResponse) => {
          expect(verification).toBe(false);
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

//word tests

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
      test("200: Responds with all available German words with their corresponding level  ", () => {
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
            english: "sit up",
            german: "aufstehen",
            image_url:
              "https://drive.google.com/file/d/1ucOGV9JYx5mZIyfgSQLjUZRW0AjYIbGY/view?usp=sharing",
          },
          {
            english: "chair",
            german: "stuhl",
            image_url:
              "https://drive.google.com/file/d/1GdE3IYBucgNpH1yguLUYcLQe5OJk1ahG/view?usp=sharing",
          },
          {
            english: "table",
            german: "tabelle",
            image_url:
              "https://drive.google.com/file/d/1mAmzrFpHx3BUvBY80_RZ8-wbklLR-Lbz/view?usp=sharing",
          },
          {
            english: "see",
            german: "sehen",
            image_url:
              "https://drive.google.com/file/d/1V4wnzIodzTAoVN1lbAJYtCWGuKyZWY4o/view?usp=sharing",
          },
          {
            english: "glass",
            german: "glas",
            image_url:
              "https://drive.google.com/file/d/1_jvFMptrkW33NJoWwvyIETf1N3r28F0Q/view?usp=sharing",
          },
        ];

        return request(app)
          .get("/api/word-list/german/4")
          .send({ user, selectedLevel })
          .expect(200)
          .then(({ body: { words } }: WordResponse) => {
            expect(words).toEqual(wordsLevelSeven);
          });
      });
      test.only("200: Responds with all available German words within a range set by word_level", () => {
        const player1 = {
          user_id: 12,
          username: "bandOnTheWall",
          name: "Merkal",
          user_level: 3,
          usersLanguage: "english",
          role: "user",
          bio: "Bort",
        };

        const player2 = {
          user_id: 4,
          username: "greyJohn",
          name: "John Major",
          user_level: 6,
          usersLanguage: "english",
          role: "user",
          bio: "Bread",
        };

        const germanWords = [
          {
            english: "dog",
            german: "hund",
            word_level: 1,
            image_url:
              "https://drive.google.com/file/d/1kDdIkIYhdIStTkvAOW4eqlqxp87Frz0c/view?usp=sharing",
          },
          {
            english: "mother",
            german: "mutter",
            word_level: 1,
            image_url:
              "https://drive.google.com/file/d/19beQ5NjylJTv7Zg0QoEWA9NTrr1Bl4a4/view?usp=sharing",
          },
          {
            english: "father",
            german: "vater",
            word_level: 1,
            image_url:
              "https://drive.google.com/file/d/1zVTTvyN2OVJV31mV53Lo4sFmUz_xJtUB/view?usp=sharing",
          },
          {
            english: "brother",
            german: "bruder",
            word_level: 2,
            image_url:
              "https://drive.google.com/file/d/1zVTTvyN2OVJV31mV53Lo4sFmUz_xJtUB/view?usp=sharing",
          },
          {
            english: "water",
            german: "wasser",
            word_level: 2,
            image_url:
              "https://drive.google.com/file/d/1GdE3IYBucgNpH1yguLUYcLQe5OJk1ahG/view?usp=sharing",
          },
          {
            english: "eat",
            german: "essen",
            word_level: 3,
            image_url:
              "https://drive.google.com/file/d/1RE0y1vQdYpvK4FkfyVxNF0UWGx9ZrkWx/view?usp=sharing",
          },
          {
            english: "read",
            german: "lesen",
            word_level: 3,
            image_url:
              "https://drive.google.com/file/d/12sXBkgDFV05DggW_envB7MsNGOETdgdr/view?usp=sharing",
          },
          {
            english: "sit down",
            german: "sitzen",
            word_level: 3,
            image_url:
              "https://drive.google.com/file/d/1mAmzrFpHx3BUvBY80_RZ8-wbklLR-Lbz/view?usp=sharing",
          },
          {
            english: "drink",
            german: "trinken",
            word_level: 3,
            image_url:
              "https://drive.google.com/file/d/1EITijBh-RsRAKy37QQhXk5NCgWTQe5Nh/view?usp=sharing",
          },
          {
            english: "fruit",
            german: "obst",
            word_level: 2,
            image_url:
              "https://drive.google.com/file/d/1m9KGsihezBmnsb1tu0G448e5wvQD7Xbq/view?usp=sharing",
          },
          {
            english: "book",
            german: "buch",
            word_level: 3,
            image_url:
              "https://drive.google.com/file/d/1_jvFMptrkW33NJoWwvyIETf1N3r28F0Q/view?usp=sharing",
          },

          {
            english: "meat",
            german: "fleisch",
            word_level: 2,
            image_url:
              "https://drive.google.com/file/d/1kzo2BhwpTMj-8m89ohCGkiKSms3YmxwO/view?usp=sharing",
          },
          {
            english: "vegetable",
            german: "gemüse",
            word_level: 2,
            image_url:
              "https://drive.google.com/file/d/1utVAXTyVG3Kows7e7GodWLsISWLJe0XR/view?usp=sharing",
          },
          {
            english: "sister",
            german: "schwester",
            word_level: 2,
            image_url:
              "https://drive.google.com/file/d/1zVTTvyN2OVJV31mV53Lo4sFmUz_xJtUB/view?usp=sharing",
          },
          {
            english: "baby",
            german: "baby",
            word_level: 1,
            image_url:
              "https://drive.google.com/file/d/1B5mP3pTvIphi_A3hJ1T1XZH-dJgSrTQR/view?usp=sharing",
          },
          {
            english: "cat",
            german: "katze",
            word_level: 1,
            image_url:
              "https://drive.google.com/file/d/1xG7qc7KfMrUZ1oWPXk8B8e7A3Muaj2tc/view?usp=sharing",
          },
        ];

        return request(app)
          .get("/api/word-list/german/game")
          .send({ player1, player2 })
          .expect(200)
          .then(({ body: { words } }: WordResponse) => {
            expect(words).toEqual(germanWords);
          });
      });
    });
  });
});

//leaderboard tests

describe("/leaderboards", () => {
  describe("/get /leaderboard/:user_id/:language", () => {
    test("should return rank information when provided with user_id and langauge", () => {
      return request(app)
        .get("/api/leaderboard/1/French")
        .expect(200)
        .then(({ body: { leaderboardEntry } }: LeaderboardResponse) => {
          expect(leaderboardEntry).toEqual(
            expect.objectContaining({
              leaderboard_id: expect.any(Number),
              rank: expect.any(Number),
              user_id: 1,
              language: "French",
            })
          );
        });
    });
    describe("error handling", () => {
      test("404: should return 404 if user_id is valid type but does not exist", () => {
        return request(app)
          .get("/api/leaderboard/31415/French")
          .expect(404)
          .then(({ body: { error } }: ErrorResponse) => {
            expect(error).toEqual("Not found!");
          });
      });
      test("400: should return bad request when user_id is invalid type", () => {
        return request(app)
          .get("/api/leaderboard/IMADINOSAUR/French")
          .expect(400)
          .then(({ body: { error } }: ErrorResponse) => {
            expect(error).toEqual("Bad request!");
          });
      });
      test("400: should return bad request error if language not valid", () => {
        return request(app)
          .get("/api/leaderboard/1/FishLanguage")
          .expect(400)
          .then(({ body: { error } }: ErrorResponse) => {
            expect(error).toEqual("Bad request!");
          });
      });
    });
  });
  describe("PATCH /leaderboard/:user_id/language", () => {
    test("should respond wtih 200 and updated rank when send with correct body", () => {
      return request(app)
        .patch("/api/leaderboard/1/French")
        .send({ newRank: 1950 })
        .expect(200)
        .then(({ body: { updatedRank } }: UpdatedRankResponse) => {
          expect(updatedRank).toEqual(1950);
        });
    });
    describe("errorhandling", () => {
      test("404: should return 404 if user_id is valid type but does not exist", () => {
        return request(app)
          .patch("/api/leaderboard/31415/French")
          .send({ newRank: 1950 })
          .expect(404)
          .then(({ body: { error } }: ErrorResponse) => {
            expect(error).toEqual("Not found!");
          });
      });
      test("400: should return bad request when user_id is an invalid type", () => {
        return request(app)
          .patch("/api/leaderboard/IMADINOSAUR/French")
          .send({ newRank: 1950 })
          .expect(400)
          .then(({ body: { error } }: ErrorResponse) => {
            expect(error).toEqual("Bad request!");
          });
      });
      test("400: should return bad request when language is invalid", () => {
        return request(app)
          .patch("/api/leaderboard/1/FishLanguage")
          .send({ newRank: 1950 })
          .expect(400)
          .then(({ body: { error } }: ErrorResponse) => {
            expect(error).toEqual("Bad request!");
          });
      });
      test("400: should return bad request when newRank is missing", () => {
        return request(app)
          .patch("/api/leaderboard/1/French")
          .send({})
          .expect(400)
          .then(({ body: { error } }: ErrorResponse) => {
            expect(error).toEqual("Bad request!");
          });
      });
      test("400: should return bad request when newRank is an invalid type", () => {
        return request(app)
          .patch("/api/leaderboard/1/French")
          .send({ newRank: "highRank" })
          .expect(400)
          .then(({ body: { error } }: ErrorResponse) => {
            expect(error).toEqual("Bad request!");
          });
      });
    });
  });
});
