const devData = require("../data/testData/index.ts");
const seedForPSQL = require("./seed.ts");
const dbForSeed = require("../connection.ts");

const runSeed = () => {
  return seedForPSQL(devData).then(() => dbForSeed.end());
};
runSeed();
