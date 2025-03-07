const request = require("supertest");
const app = require("../index");
const seed = require("../../db/seeds/seed.ts");
const connection = require("../../db/connection");
const data = require("../../db/data/testData/index");
const { frenchTestWords } = require("./wordsFrench");
const { spainishTestWords } = require("./wordsSpanish");
import { Word, User } from "@/types";

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return connection.end();
});

type WordResponse = { body: { words: Word[] } };
type ErrorResponse = { body: { error: string } };
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
