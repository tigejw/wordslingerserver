import { faker } from "@faker-js/faker";
import {
  User,
  Language,
  Word,
  Data,
  Game,
  Achievement,
  Leaderboard,
  Friend,
  WordMastery,
} from "../../types";

export function createUsersData(seed: number) {
  faker.seed(seed);
  const user: User = {
    name: faker.person.firstName(),
    avatar_url: faker.image.avatar(),
    role: faker.helpers.arrayElement(["user", "admin"]),
    bio: faker.person.bio(),
    username: "",
  };

  user.username = faker.internet.username({ firstName: user.name });

  return user;
}

export function createFriendsData(seed: number) {
  faker.seed(seed);

  const friends: Friend = {
    user_id1: faker.number.int({ min: 1, max: 20 }),
    user_id2: faker.number.int({ min: 1, max: 20 }),
    status: faker.helpers.arrayElement([
      "req_from_uid1",
      "req_from_uid2",
      "friend",
    ]),
  };

  if (friends.user_id1 === friends.user_id2) {
    friends.user_id2 = faker.number.int({ min: 1, max: 20 });
  }

  return friends;
}

export function createGameData(seed: number) {
  faker.seed(seed);
  const games: Game = {
    game: faker.helpers.arrayElement(["Shoot out"]),
    winner: faker.number.int({ min: 1, max: 20 }),
    loser: faker.number.int({ min: 1, max: 20 }),
    isDraw: false,
  };

  if (games.winner === games.loser) {
    games.loser = faker.number.int({ min: 1, max: 20 });
  }

  const drawnGames: Game = {
    game: faker.helpers.arrayElement(["Shoot out"]),
    winner: null,
    loser: null,
    isDraw: true,
  };

  return [games, drawnGames];
}

export function createUsersLanguagesData() {
  faker.seed(0);
  return {
    user_id: faker.number.int({ min: 1, max: 20 }),
    language: faker.helpers.arrayElement(["German", "Spanish", "French"]),
    current_level: faker.number.int({ min: 1, max: 500 }),
  };
}

export function createWordData() {
  // an array of words
  // or just look at how to import a spreadsheet into PSQL
}

export function createLeaderboardData() {
  return {
    rank: faker.number.int({ min: 1, max: 2000 }),
    user_id: faker.number.int({ min: 1, max: 20 }),
    language: faker.helpers.arrayElement(["German", "Spanish", "French"]),
  };
}

export function createWordMasteryData(): WordMastery {
  //how does the app keep track of a user's word mastery?
  return {
    // user_id: faker.number.int({ min: 1, max: 20 }),
    //english_word:  faker.helpers.arrayElement([ARRAY OF ENGLISH WORDS]
    english: "hkfdgfnjgnd bjd",
    german_mastery: faker.helpers.arrayElement([
      "beginner",
      "intermediate",
      "master",
    ]),
    spanish_mastery: faker.helpers.arrayElement([
      "beginner",
      "intermediate",
      "master",
    ]),
    french_mastery: faker.helpers.arrayElement([
      "beginner",
      "intermediate",
      "master",
    ]),
  };
}

//let user_id < faker generate number
// while id2 and id2 are the same, keep generating

// ON HOLD - might be better to use a csv .wordsData = require("./words.ts");
// OM HOLD - write some achievements to go in an array
