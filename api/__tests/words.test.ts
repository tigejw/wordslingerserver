const endpointsJson = require("../endpoints.json");
const request = require("supertest");
const app = require("../index");
const { selectUsers } = require("../../api/model/userModel");
const seed = require("../../db/seeds/seed.ts");
const connection = require("../../db/connection");
const data = require("../../db/data/testData/index");
import { Word } from "@/types";
import { response } from "express";

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return connection.end();
});

type WordResponse = { body: { words: Word[] } };

describe("GET REQUESTS", () => {
  describe("GET - /words", () => {
    test("200: Responds with every word from all available languages with their corresponding level ", () => {
      return request(app)
        .get("/api/words/")
        .expect(200)
        .then(({ body: { words } }: WordResponse) => {
          expect(words).toEqual(data.wordsData);
        });
    });
    test("404: Responds with a 404 when an incorrect pathway is given ", () => {
      return request(app)
        .get("/api/vords/")
        .expect(404)
        .then(({ body: { words } }: WordResponse) => {
          expect(words).toBe("404: Not found");
        });
    });
  });
});
