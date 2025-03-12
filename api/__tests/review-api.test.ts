import { ReviewData, UpdatedMastery } from "@/types";

const request = require("supertest");
const app = require("../index");
const seed = require("../../db/seeds/seed.ts");
const connection = require("../../db/connection");
const data = require("../../db/data/testData/index");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return connection.end();
});

type ReviewResponse = { body: { reviewData: ReviewData } };
type ErrorResponse = { body: { error: string } };
type UpdatedMasteryResponse = { body: { updatedMastery: UpdatedMastery } };

describe("/api/reviews/:user_id", () => {
  describe("GET:", () => {
    test("200: /api/reviews/:user_id", () => {
      return request(app)
        .get("/api/reviews/1")
        .expect(200)
        .then(({ body: { reviewData } }: ReviewResponse) => {
          expect(Array.isArray(reviewData.frenchReviewData)).toBe(true);
          expect(Array.isArray(reviewData.germanReviewData)).toBe(true);
          expect(Array.isArray(reviewData.spanishReviewData)).toBe(true);
        });
    });
    test("404: Responds with an error if user_id does not exist", () => {
      return request(app)
        .get("/api/reviews/100000")
        .expect(404)
        .then(({ body: { error } }: ErrorResponse) => {
          expect(error).toEqual("Not found!");
        });
    });
  });
  describe("PATCH: /api/reviews/:user_id", () => {
    test("should respond wtih 200 and updated mastery when sent with correct body", () => {
      return request(app)
        .patch("/api/reviews/1")
        .send({
          english: "cat",
          target_language: "german",
          new_mastery: "intermediate",
        })
        .expect(200)
        .then(({ body: { updatedMastery } }: UpdatedMasteryResponse) => {
          const { user_id, english, german_mastery } = updatedMastery;
          expect(user_id).toBe(1);
          expect(english).toBe("cat");
          expect(german_mastery).toBe("intermediate");
        });
    });
  });
  describe("should respond with 400 and error message when sent malformed body", () => {
    test("eng", () => {
      return request(app)
        .patch("/api/reviews/1")
        .send({
          eng: "cat",
          target_language: "german",
          new_mastery: "intermediate",
        })
        .expect(400)
        .then(({ body: { error } }: ErrorResponse) => {
          expect(error).toBe("Bad request!");
        });
    });
    test("targnguage", () => {
      return request(app)
        .patch("/api/reviews/1")
        .send({
          english: "cat",
          targnguage: "german",
          new_mastery: "intermediate",
        })
        .expect(400)
        .then(({ body: { error } }: ErrorResponse) => {
          expect(error).toBe("Bad request!");
        });
    });
    test("nestery", () => {
      return request(app)
        .patch("/api/reviews/1")
        .send({
          english: "cat",
          target_language: "german",
          nestery: "intermediate",
        })
        .expect(400)
        .then(({ body: { error } }: ErrorResponse) => {
          expect(error).toBe("Bad request!");
        });
    });
  });
});
