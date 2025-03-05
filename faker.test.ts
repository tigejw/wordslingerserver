import {
  createFriendsData,
  createGameData,
  createLeaderboardData,
  createUsersData,
  createUsersLanguagesData,
  createWordMasteryData,
} from "./db/data/faker";

describe("testing", () => {
  test("testing", () => {});

  console.log(createGameData(1));
  console.log(createUsersData(2));
  console.log(createFriendsData(3));
  console.log(createUsersLanguagesData());
  console.log(createLeaderboardData());
  console.log(createWordMasteryData());
});
