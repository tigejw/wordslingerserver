export type User = {
  user_id?: Userid;
  username: Username;
  name: string;
  language: string;
  avatar_url: string;
  role: "user" | "admin";
  bio: string;
};

export type Username = string;
export type Userid = number;

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
  room_id: string;
  winner: number;
  loser: number;
  wordlist: string;
  winner_correct_answers: Array<string> 
  loser_correct_answers: Array<string> 
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
  user_id: number;
  german_mastery: "beginner" | "intermediate" | "master";
  spanish_mastery: "beginner" | "intermediate" | "master";
  french_mastery: "beginner" | "intermediate" | "master";
};
