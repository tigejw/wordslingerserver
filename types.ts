export type User = {
  user_id?: Userid;
  username: Username;
  name: string;
  password: string;
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
  language_id: number;
};

export type Word = {
  english: string;
  french: string;
  german: string;
  spanish: string;
  word_level: number;
  image_url: string;
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
  winner_initial_points: number;
  winner_updated_points: number;
  loser_initial_points: number;
  loser_updated_points: number;
  language: "German" | "French" | "Spanish";
  english_wordlist: Array<string>;
  non_english_wordlist: Array<string>;
  winner_correct_answers: Array<string>;
  loser_correct_answers: Array<string>;
};

export type Achievement = {
  achievement: string;
  user_id: number;
  achievement_unlocked: boolean;
};

export type Leaderboard = {
  leaderboard_id?: number;
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
export type ReviewData = {
  germanReviewData: Array<{
    english: string;
    german: string;
    image_url: string | null;
    german_mastery: string | null;
    german_review_interval_sec: number;
  }>;
  spanishReviewData: Array<{
    english: string;
    spanish: string;
    image_url: string | null;
    spanish_mastery: string | null;
    spanish_review_interval_sec: number;
  }>;
  frenchReviewData: Array<{
    english: string;
    french: string;
    image_url: string | null;
    french_mastery: string | null;
    french_review_interval_sec: number;
  }>;
};
