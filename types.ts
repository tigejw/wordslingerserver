export type User = {
  user_id?: number;
  username: string;
  name: string;
  language: string;
  avatar_url: string;
  role: "user" | "admin";
  bio: string;
};

export type Language = {
  user_id: number;
  language: "German" | "Spanish" | "French";
  current_level: number;
};

export type Word = {
  english: string;
  french: string;
  german: string;
  spanish: string;
  word_level: number;
};

export type Data = {
  achievementsData: Array<Achievement>;
  friendsData: Array<Friend>;
  gamesData: Array<Game>;
  languagesData: Array<Language>;
  leaderboardData: Array<Leaderboard>;
  usersData: Array<User>;
  word_masteryData: Array<WordMastery>;
  wordsData: Array<Word>;
};

export type Game = {
  game: string;
  winner: number | null;
  loser: number | null;
  isDraw: boolean;
};

export type Achievement = {
  achievement: string;
  user_id: number;
  achievement_unlocked: boolean;
};

export type Leaderboard = {
  rank: number;
  user_id: number;
  language: string;
};

export type Friend = {
  user_id1: number;
  user_id2: number;
  status: string;
};

export type WordMastery = {
  english: string;
  german_mastery: "beginner" | "intermediate" | "master";
  spanish_mastery: string;
  french_mastery: string;
};
