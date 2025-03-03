import { availableMemory } from "process";

const db = require("../connection.ts");
const format = require("pg-format");

type Data = {
  achievementsData: Array<object>;
  friendsData: Array<object>;
  gamesData: Array<object>;
  languagesData: Array<Languages>;
  leaderboardData: Array<object>;
  usersData: [User];
  word_masteryData: Array<object>;
  wordsData: Array<object>;
};

type User = {
  username: string;
  name: string;
  avatar_url: string;
  role: string;
  bio: string;
};

type Languages = {
  user_id: number;
  language: string;
  current_level: number;
};

function seed(data: Data) {
  //look up destructing objects in TS
  return db
    .query("DROP TABLE IF EXISTS users;")
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS avaliableLanguages;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS languages;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS friends;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS games;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS words;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS achievements;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS leaderboard;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS word_mastery;`);
    })
    .then(() => {
      return createUsersTable();
    })
    .then(() => {
      return createAvaliableLanguages();
    })
    .then(() => {
      return createLanguagesTable();
    })
    .then(() => {
      return createGamesTable();
    })
    .then(() => {
      return createAchievementsTable();
    })
    .then(() => {
      return createLeaderboardTable();
    })
    .then(() => {
      return createFriendsTable();
    })
    .then(() => {
      return createWordsTable();
    })
    .then(() => {
      return createWordMasteryTable();
    })
    .then(() => {
      return insertUserData(data.usersData);
    })
    .then(() => {
      return insertAvaliableLanguages();
    })
    .then(() => {
      return insertLanguagesData(data.languagesData);
    });
}

function createUsersTable() {
  return db.query(`CREATE TABLE users(
        user_id SERIAL PRIMARY KEY,
        username VARCHAR NOT NULL,
        name VARCHAR NOT NULL,
        avatar_url VARCHAR,
        role VARCHAR NOT NULL,
        bio TEXT DEFAULT NULL
        );`);
}

function createAvaliableLanguages() {
  return db.query(`CREATE TABLE availableLanguages (
    language varchar PRIMARY KEY);`);
}
function createLanguagesTable() {
  return db.query(`CREATE TABLE languages(
        language_id SERIAL PRIMARY KEY,
        language VARCHAR REFERENCES availableLanguages(language),
        user_id INT REFERENCES users(user_id),
        current_level INT
        );`);
}

function createGamesTable() {
  return db.query(`CREATE TABLE games(
        game_id SERIAL PRIMARY KEY,
        game VARCHAR,
        winner INT REFERENCES users(user_id),
        loser INT REFERENCES users(user_id),
        isDraw BOOL,
        match_date TIMESTAMP DEFAULT NOW()
        )`); //match_summary:{round:1, word: ref words table, winner ref user_id}
}

function createAchievementsTable() {
  return db.query(`CREATE TABLE achievements(
        achievement_id SERIAL PRIMARY KEY,
        achievement VARCHAR,
        user_id INT REFERENCES users(user_id)
        )`);
}

function createLeaderboardTable() {
  return db.query(`CREATE TABLE leaderboard(
        leaderboard_id SERIAL PRIMARY KEY,
        rank INT,
        user_id INT REFERENCES users(user_id),
        language VARCHAR REFERENCES availableLanguages(language)
        )`);
}

function createFriendsTable() {
  return db
    .query(
      `CREATE TYPE friend_status AS ENUM ('req_from_uid1','req_from_uid2','friend')`
    )
    .then(() => {
      return db.query(`CREATE TABLE friends(
        friend_id SERIAL PRIMARY KEY,
        user_id1 INT REFERENCES users(user_id),
        user_id2 INT REFERENCES users(user_id),
        status friend_status,
        CHECK (user_id1 < user_id2)
        )`);
    });
}

function createWordsTable() {
  return db.query(`CREATE TABLE words(
        english_word VARCHAR PRIMARY KEY,
        german_word VARCHAR,
        spanish_word VARCHAR,
        french_word VARCHAR,
        word_level INT
        )`);
}

function createWordMasteryTable() {
  return db
    .query(
      `CREATE TYPE mastery_level AS ENUM ('beginner','intermediate','master')`
    )
    .then(() => {
      return db.query(`CREATE TABLE word_mastery(
            mastery_id SERIAL PRIMARY KEY,
            english_word VARCHAR REFERENCES words(english_word),
            german_mastery mastery_level,
            spanish_mastery mastery_level,
            french_mastery mastery_level
            )`);
    });
}

function insertUserData(usersData: Array<User>) {
  const formattedData = usersData.map((user) => {
    const { username, name, avatar_url, role, bio } = user;
    return [username, name, avatar_url, role, bio];
  });
  const queryString = format(
    `INSERT INTO users (username, name, avatar_url, role, bio)
    VALUES %L RETURNING *`,
    formattedData
  );

  return db.query(queryString);
}

function insertAvaliableLanguages() {
  const languages = ["English", "French", "German", "Spanish"];
  return db.query(
    `INSERT INTO availableLanguages(language) VALUES ($1), ($2), ($3), ($4) RETURNING *`,
    languages
  );
}

function insertLanguagesData(languagesData: Array<Languages>) {
  const formattedData = languagesData.map((languageData) => {
    const { language, user_id, current_level } = languageData;
    return [language, user_id, current_level];
  });
  const queryString = format(
    `INSERT INTO languages (language, user_id, current_level)
    VALUES %L RETURNING *`,
    formattedData
  );
  return db.query(queryString);
}

module.exports = seed;
