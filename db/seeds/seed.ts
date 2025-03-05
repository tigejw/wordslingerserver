const db = require("../connection.ts");
const format = require("pg-format");
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
    })
    .then(() => {
      return insertGamesData(data.gamesData);
    })
    .then(() => {
      return insertAchievementsData(data.achievementsData);
    })
    .then(() => {
      return insertLeaderboardData(data.leaderboardData);
    })
    .then(() => {
      return insertFriendsData(data.friendsData);
    })
    .then(() => {
      return insertWordsData(data.wordsData);
    })
    .then(() => {
      return insertWordMasteryData(data.word_masteryData);
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
  return db.query(`CREATE TABLE available_languages (
    language varchar PRIMARY KEY);`);
}
function createLanguagesTable() {
  return db.query(`CREATE TABLE languages(
        language_id SERIAL PRIMARY KEY,
        language VARCHAR REFERENCES available_languages(language),
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
        match_date TIMESTAMP NOT NULL DEFAULT NOW()
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
        language VARCHAR REFERENCES available_languages(language)
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
        english VARCHAR PRIMARY KEY,
        german VARCHAR,
        spanish VARCHAR,
        french VARCHAR,
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
            english VARCHAR REFERENCES words(english),
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
  const languages = ["French", "German", "Spanish"];
  return db.query(
    `INSERT INTO available_languages(language) VALUES ($1), ($2), ($3) RETURNING *`,
    languages
  );
}

function insertLanguagesData(languagesData: Array<Language>) {
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

function insertGamesData(gamesData: Array<Game>) {
  const formattedData = gamesData.map((gameData) => {
    const { game, winner, loser, isDraw } = gameData;

    return [game, winner, loser, isDraw];
  });
  const queryString = format(
    `INSERT INTO games (game, winner, loser, isDraw)
    VALUES %L RETURNING *`,
    formattedData
  );
  return db.query(queryString);
}

function insertAchievementsData(achievementsData: Array<Achievement>) {
  const formattedData = achievementsData.map((achievementData) => {
    const { achievement, user_id } = achievementData;
    return [achievement, user_id];
  });
  const queryString = format(
    `
    INSERT INTO achievements (achievement, user_id)
    VALUES %L RETURNING *
    `,
    formattedData
  );
  return db.query(queryString);
}

function insertLeaderboardData(leaderboardsData: Array<Leaderboard>) {
  const formattedData = leaderboardsData.map((leaderboardData) => {
    const { rank, user_id, language } = leaderboardData;
    return [rank, user_id, language];
  });
  const queryString = format(
    `
    INSERT INTO leaderboard (rank, user_id, language)
    VALUES %L RETURNING *
    `,
    formattedData
  );
  return db.query(queryString);
}

function insertFriendsData(friendsData: Array<Friend>) {
  const formattedData = friendsData.map((friendData) => {
    const { user_id1, user_id2, status } = friendData;
    return [user_id1, user_id2, status];
  });
  const queryString = format(
    `
    INSERT INTO friends (user_id1, user_id2, status)
    VALUES %L RETURNING *
    `,
    formattedData
  );
  return db.query(queryString);
}

function insertWordsData(wordsData: Array<Word>) {
  const formattedData = wordsData.map((wordData) => {
    const { english, french, german, spanish, word_level } = wordData;
    return [english, french, german, spanish, word_level];
  });
  const queryString = format(
    `
    INSERT INTO words (english, french, german, spanish, word_level)
    VALUES %L RETURNING *
    `,
    formattedData
  );
  return db.query(queryString);
}

function insertWordMasteryData(word_masteryData: Array<WordMastery>) {
  const formattedData = word_masteryData.map((data) => {
    const { english, german_mastery, spanish_mastery, french_mastery } = data;
    return [english, german_mastery, spanish_mastery, french_mastery];
  });
  const queryString = format(
    `
    INSERT INTO word_mastery (english, german_mastery, spanish_mastery, french_mastery)
    VALUES %L RETURNING *
    `,
    formattedData
  );
  return db.query(queryString);
}
module.exports = seed;
