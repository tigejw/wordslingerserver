export type User = {
  user_id?: number;
  username: string;
  name: string;
  avatar_url: string;
  role: "user" | "admin";
  bio: string;
};

export type Language = {
  username: string;
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
