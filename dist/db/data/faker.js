"use strict";
// import { faker } from "@faker-js/faker";
// import {
//   User,
//   Language,
//   Word,
//   Data,
//   Game,
//   Achievement,
//   Leaderboard,
//   Friend,
//   WordMastery,
// } from "../../types";
Object.defineProperty(exports, "__esModule", { value: true });
// //for lnguages, we need a while loop to make sure a user doesn't have multiple ranks for one language
// // exists = false, the while loop will end
// export function dataGeneration() {
//   // const usersData = [];
//   // const friendsData = [];
//   // const gamesData = [];
//   const usersLanguagesData = [];
//   const leaderboardData = [];
//   // for (let i = 0; i < 21; i++) {
//   //   usersData.push(createUsersData(i));
//   //   friendsData.push(createFriendsData(i));
//   // }
//   for (let i = 0; i < 50; i++) {
//     usersLanguagesData.push(createUsersLanguagesData());
//   }
//   for (let i = 0; i < 50; i++) {
//     // gamesData.push(createGameData(i));
//     leaderboardData.push(createLeaderboardData());
//   }
//   console.log(
//     // "Users:",
//     // usersData,
//     // "Friends:",
//     // friendsData,
//     // "Games:",
//     // gamesData,
//     "Users languages:",
//     usersLanguagesData,
//     "Leaderboard:",
//     leaderboardData
//   );
// }
// export function createUsersData(seed: number) {
//   faker.seed(seed);
//   const user: User = {
//     name: faker.person.firstName(),
//     avatar_url: faker.image.avatar(),
//     role: faker.helpers.arrayElement(["user", "admin"]),
//     bio: faker.person.bio(),
//     username: "",
//     language: faker.helpers.arrayElements(["English", "Spani"])
//   };
//   user.username = faker.internet.username({ firstName: user.name });
//   return user;
// }
// export function createFriendsData(seed: number) {
//   faker.seed(seed);
//   const friends: Friend = {
//     user_id1: seed,
//     user_id2: faker.number.int({ min: seed + 1, max: 20 }),
//     status: faker.helpers.arrayElement([
//       "req_from_uid1",
//       "req_from_uid2",
//       "friend",
//     ]),
//   };
//   if (friends.user_id1 === friends.user_id2) {
//     friends.user_id2 = faker.number.int({ min: 1, max: 20 });
//   }
//   return friends;
// }
// export function createGameData(seed: number) {
//   faker.seed(seed);
//   const games: Game = {
//     game: faker.helpers.arrayElement(["Shoot out"]),
//     winner: faker.number.int({ min: 1, max: 20 }),
//     loser: faker.number.int({ min: 1, max: 20 }),
//     isDraw: false,
//   };
//   if (games.winner === games.loser) {
//     games.loser = faker.number.int({ min: 1, max: 20 });
//   }
//   //this can be uncommented if more game modes are added, please add them to the game array.
//   // const drawnGames: Game = {
//   //   game: faker.helpers.arrayElement(["Shoot out"]),
//   //   winner: null,
//   //   loser: null,
//   //   isDraw: true,
//   //};
//   return games;
// }
// export function createUsersLanguagesData() {
//   return {
//     user_id: faker.number.int({ min: 1, max: 30 }),
//     language: faker.helpers.arrayElement(["German", "Spanish", "French"]),
//     current_level: faker.number.int({ min: 1, max: 10 }),
//   };
// }
// export function createLeaderboardData() {
//   return {
//     user_id: faker.number.int({ min: 1, max: 20 }),
//     language: faker.helpers.arrayElement(["German", "Spanish", "French"]),
//     rank: faker.number.int({ min: 1, max: 2000 }),
//   };
// }
// export function createWordMasteryData(seed: number): WordMastery {
//   faker.seed(seed);
//   //how does the app keep track of a user's word mastery?
//   return {
//     // user_id: faker.number.int({ min: 1, max: 20 }),
//     //english_word:  faker.helpers.arrayElement([ARRAY OF ENGLISH WORDS]
//     english: "PlaceHolder",
//     german_mastery: faker.helpers.arrayElement([
//       "beginner",
//       "intermediate",
//       "master",
//     ]),
//     spanish_mastery: faker.helpers.arrayElement([
//       "beginner",
//       "intermediate",
//       "master",
//     ]),
//     french_mastery: faker.helpers.arrayElement([
//       "beginner",
//       "intermediate",
//       "master",
//     ]),
//   };
// }
// //let user_id < faker generate number
// // while id2 and id2 are the same, keep generating
// // ON HOLD - might be better to use a csv .wordsData = require("./words.ts");
// // OM HOLD - write some achievements to go in an array
