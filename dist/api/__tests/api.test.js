"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const app = require("../index");
const seed = require("../../db/seeds/seed.ts");
const connection = require("../../db/connection");
const data = require("../../db/data/testData/index");
const { frenchTestWords } = require("./wordsFrench");
const { spainishTestWords } = require("./wordsSpanish");
beforeEach(() => {
    return seed(data);
});
afterAll(() => {
    return connection.end();
});
describe("/users", () => {
    describe("GET /users", () => {
        test("get users", () => {
            return request(app)
                .get("/api/users/")
                .expect(200)
                .then(({ body: { users } }) => {
                expect(Array.isArray(users)).toBe(true);
            });
        });
    });
    describe("GET /users/:user_id", () => {
        test("200: Responds with a user object", () => {
            return request(app)
                .get("/api/users/1")
                .expect(200)
                .then(({ body: { user } }) => {
                expect(Array.isArray(user)).toBe(true);
                expect(user[0].user_id).toEqual(1);
            });
        });
    });
    describe("POST /users", () => {
        test("201: Responds with the posted comment", () => {
            const newUser = {
                name: "Bercow",
                avatar_url: "https://i.guim.co.uk/img/media/c5e73ed8e8325d7e79babf8f1ebbd9adc0d95409/2_5_1754_1053/master/1754.jpg?width=465&dpr=1&s=none&crop=none",
                role: "user",
                bio: "cat, speaker, meowmrow",
                username: "Stinkyboy",
            };
            return request(app)
                .post("/api/users")
                .send(newUser)
                .expect(201)
                .then(({ body: { user } }) => {
                expect(user[0].username).toEqual("Stinkyboy");
                expect(typeof user[0].user_id).toEqual("number");
            });
            return request(app)
                .get("/api/users/")
                .expect(200)
                .then(({ body: { users } }) => {
                expect(Array.isArray(users)).toBe(true);
            });
        });
    });
    describe("GET /users/:user_id", () => {
        test("200: Responds with a user object", () => {
            return request(app)
                .get("/api/users/1")
                .expect(200)
                .then(({ body: { user } }) => {
                expect(Array.isArray(user)).toBe(true);
                expect(user[0].user_id).toEqual(1);
            });
        });
    });
    describe("POST /users", () => {
        test("201: Responds with the posted comment", () => {
            const newUser = {
                name: "Bercow",
                avatar_url: "https://i.guim.co.uk/img/media/c5e73ed8e8325d7e79babf8f1ebbd9adc0d95409/2_5_1754_1053/master/1754.jpg?width=465&dpr=1&s=none&crop=none",
                role: "user",
                bio: "cat, speaker, meowmrow",
                username: "Stinkyboy",
            };
            return request(app)
                .post("/api/users")
                .send(newUser)
                .expect(201)
                .then(({ body: { user } }) => {
                expect(user[0].username).toEqual("Stinkyboy");
                expect(typeof user[0].user_id).toEqual("number");
            });
        });
    });
    describe("PATCH /users/:user_id", () => { });
    describe("DELETE /users/:user_id", () => {
        test("204: Responds with a 204 and nothing", () => {
            return request(app).delete("/api/users/1").expect(204);
        });
    });
    //type LanguageResponse = { body: { user: Language[] } };
    describe.skip("/languages", () => {
        describe("GET /language/:user_id", () => {
            test("get the languages of a user", () => {
                return request(app)
                    .get("/api/language/2")
                    .expect(200)
                    .then(({ body: { language } }) => {
                    expect(Array.isArray(language)).toBe(true);
                });
            });
        });
    });
    describe("POST /langugage/:user_id", () => { });
    describe("PATCH /language/:user_id", () => { });
});
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
                .then(({ body: { game } }) => {
                expect(game).toEqual(expect.objectContaining({
                    room_id: "testroomid5",
                    winner: 1,
                    loser: 2,
                    wordlist: ["apple", "banana", "orange"],
                    winner_correct_answers: ["apple", "banana"],
                    loser_correct_answers: ["apple"],
                    match_date: expect.any(String),
                }));
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
                    .then(({ body: { error } }) => {
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
                    .then(({ body: { error } }) => {
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
                    .then(({ body: { error } }) => {
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
                    .then(({ body: { error } }) => {
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
                    .then(({ body: { error } }) => {
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
                    .then(({ body: { error } }) => {
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
                    .then(({ body: { error } }) => {
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
                    .then(({ body: { error } }) => {
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
                    .then(({ body: { error } }) => {
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
                .then(({ body: { error } }) => {
                expect(error).toEqual("Not found!");
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
                .then(({ body: { words } }) => {
                expect(words).toEqual(data.wordsData);
            });
        });
        test("404: Responds with a 404 when an incorrect pathway is given ", () => {
            return request(app)
                .get("/api/vords/")
                .expect(404)
                .then(({ body: { error } }) => {
                expect(error).toBe("Invalid URL");
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
                .then(({ body: { words } }) => {
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
                    .then(({ body: { words } }) => {
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
                    .then(({ body: { words } }) => {
                    expect(words).toEqual(wordsLevelSeven);
                });
            });
        });
    });
});
