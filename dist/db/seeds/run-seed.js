"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data = require("../data/testData/index.ts");
const seedForPSQL = require("./seed.ts");
const dbForSeed = require("../connection.ts");
const runSeed = () => {
    return seedForPSQL(data).then(() => dbForSeed.end());
};
runSeed();
