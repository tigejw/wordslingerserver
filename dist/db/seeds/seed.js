"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../connection.ts");
const format = require("pg-format");
function seed(data) {
    //look up destructing objects in TS
    return db
        .query("DROP TABLE IF EXISTS users CASCADE;")
        .then(() => {
        return db.query(`DROP TABLE IF EXISTS available_languages CASCADE;`);
    })
        .then(() => {
        return db.query(`DROP TABLE IF EXISTS languages;`);
    })
        .then(() => {
        return db.query(`DROP TABLE IF EXISTS friends;`);
    })
        .then(() => {
        return db.query("DROP TYPE IF EXISTS friend_status");
    })
        .then(() => {
        return db.query(`DROP TABLE IF EXISTS games;`);
    })
        .then(() => {
        return db.query(`DROP TABLE IF EXISTS words CASCADE;`);
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
        return db.query(`DROP TYPE IF EXISTS mastery_level;`);
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
        password TEXT NOT NULL,
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
        user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
        current_level INT
        );`);
}
function createGamesTable() {
    return db.query(`CREATE TABLE games(
        room_id VARCHAR PRIMARY KEY,
        winner INT REFERENCES users(user_id) ON DELETE SET NULL,
        loser INT REFERENCES users(user_id) ON DELETE SET NULL,
        winner_correct_answers JSONB NOT NULL,
        loser_correct_answers JSONB NOT NULL,
        wordlist JSONB NOT NULL,
        match_date TIMESTAMP NOT NULL DEFAULT NOW()
        )`);
}
//need util that returns user_id when inputted username string!
function createAchievementsTable() {
    return db.query(`CREATE TABLE achievements(
        achievement_id SERIAL PRIMARY KEY,
        achievement VARCHAR,
        user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
        achievement_unlocked BOOLEAN
        )`);
}
function createLeaderboardTable() {
    return db.query(`CREATE TABLE leaderboard(
        leaderboard_id SERIAL PRIMARY KEY,
        rank INT,
        user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
        language VARCHAR REFERENCES available_languages(language)
        )`);
}
function createFriendsTable() {
    return db
        .query(`CREATE TYPE friend_status AS ENUM ('req_from_uid1','req_from_uid2','friend')`)
        .then(() => {
        return db.query(`CREATE TABLE friends(
        friend_id SERIAL PRIMARY KEY,
        user_id1 INT REFERENCES users(user_id) ON DELETE CASCADE,
        user_id2 INT REFERENCES users(user_id) ON DELETE CASCADE,
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
        .query(`CREATE TYPE mastery_level AS ENUM ('beginner','intermediate','master')`)
        .then(() => {
        return db.query(`CREATE TABLE word_mastery(
            mastery_id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
            english VARCHAR REFERENCES words(english),
            german_mastery mastery_level,
            spanish_mastery mastery_level,
            french_mastery mastery_level,
            german_last_review TIMESTAMP,
            spanish_last_review TIMESTAMP,
            french_last_review TIMESTAMP 
            )`);
    });
}
function insertUserData(usersData) {
    const queryString = `
    INSERT INTO users (username, name, password, avatar_url, role, bio)
    VALUES ($1, $2, crypt($3, gen_salt('bf')), $4, $5, $6)
    RETURNING *`;
    const userPromises = usersData.map((user) => {
        const { username, name, password, avatar_url, role, bio } = user;
        const params = [username, name, password, avatar_url, role, bio];
        return db.query(queryString, params);
    });
    return Promise.all(userPromises);
}
function insertAvaliableLanguages() {
    const languages = ["French", "German", "Spanish"];
    return db.query(`INSERT INTO available_languages(language) VALUES ($1), ($2), ($3) RETURNING *`, languages);
}
function insertLanguagesData(languagesData) {
    const formattedData = languagesData.map((languageData) => {
        const { language, user_id, current_level } = languageData;
        return [language, user_id, current_level];
    });
    const queryString = format(`INSERT INTO languages (language, user_id, current_level)
    VALUES %L RETURNING *`, formattedData);
    return db.query(queryString);
}
function insertGamesData(gamesData) {
    const formattedData = gamesData.map((gameData) => {
        const { room_id, winner, loser, wordlist, winner_correct_answers, loser_correct_answers, } = gameData;
        return [
            room_id,
            winner,
            loser,
            wordlist,
            winner_correct_answers,
            loser_correct_answers,
        ];
    });
    const queryString = format(`INSERT INTO games (room_id, winner, loser, wordlist, winner_correct_answers, loser_correct_answers)
    VALUES %L RETURNING *`, formattedData);
    return db.query(queryString);
}
function insertAchievementsData(achievementsData) {
    const formattedData = achievementsData.map((achievementData) => {
        const { achievement, user_id, achievement_unlocked } = achievementData;
        return [achievement, user_id, achievement_unlocked];
    });
    const queryString = format(`
    INSERT INTO achievements (achievement, user_id, achievement_unlocked)
    VALUES %L RETURNING *
    `, formattedData);
    return db.query(queryString);
}
function insertLeaderboardData(leaderboardsData) {
    const formattedData = leaderboardsData.map((leaderboardData) => {
        const { rank, user_id, language } = leaderboardData;
        return [rank, user_id, language];
    });
    const queryString = format(`
    INSERT INTO leaderboard (rank, user_id, language)
    VALUES %L RETURNING *
    `, formattedData);
    return db.query(queryString);
}
function insertFriendsData(friendsData) {
    const formattedData = friendsData.map((friendData) => {
        const { user_id1, user_id2, status } = friendData;
        return [user_id1, user_id2, status];
    });
    const queryString = format(`
    INSERT INTO friends (user_id1, user_id2, status)
    VALUES %L RETURNING *
    `, formattedData);
    return db.query(queryString);
}
function insertWordsData(wordsData) {
    const formattedData = wordsData.map((wordData) => {
        const { english, french, german, spanish, word_level } = wordData;
        return [english, french, german, spanish, word_level];
    });
    const queryString = format(`
    INSERT INTO words (english, french, german, spanish, word_level)
    VALUES %L RETURNING *
    `, formattedData);
    return db.query(queryString);
}
function insertWordMasteryData(word_masteryData) {
    const formattedData = word_masteryData.map((data) => {
        const { user_id, english, german_mastery, spanish_mastery, french_mastery, } = data;
        return [user_id, english, german_mastery, spanish_mastery, french_mastery];
    });
    const queryString = format(`
    INSERT INTO word_mastery (user_id, english, german_mastery, spanish_mastery, french_mastery)
    VALUES %L RETURNING *
    `, formattedData);
    return db.query(queryString);
}
module.exports = seed;
