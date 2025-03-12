"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
describe("/reviews/:user_id", () => {
    test("GET /reviews/:user_id", () => {
        return request(app)
            .get("/api/reviews/1")
            .expect(200)
            .then(({ body: { reviewData } }) => {
            expect(Array.isArray(reviewData.frenchReviewData)).toBe(true);
            expect(Array.isArray(reviewData.germanReviewData)).toBe(true);
            expect(Array.isArray(reviewData.spanishReviewData)).toBe(true);
        });
    });
    test("404: Responds with an error if user_id does not exist", () => {
        return request(app)
            .get("/api/reviews/100000")
            .expect(404)
            .then(({ body: { error } }) => {
            expect(error).toEqual("Not found!");
        });
    });
});
