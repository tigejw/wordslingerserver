type gameData = {
  room_id: string;
  winner: number;
  loser: number;
  wordlist: string;
  winner_correct_answers: string;
  loser_correct_answers: string;
};
module.exports = [
  {
    room_id: "testroomid1",
    winner: 1,
    loser: 2,
    winner_correct_answers: JSON.stringify(["apple", "banana"]),
    loser_correct_answers: JSON.stringify(["apple"]),
    winner_initial_points: 1800,
    winner_updated_points: 1815,
    loser_initial_points: 1750,
    loser_updated_points: 1740,
    language: "German",
    english_wordlist: JSON.stringify(["apple", "banana", "orange"]),
    non_english_wordlist: JSON.stringify(["apfel", "banane", "orange"]),
  },
  {
    room_id: "testroomid2",
    winner: 1,
    loser: 2,
    winner_correct_answers: JSON.stringify(["apple", "banana"]),
    loser_correct_answers: JSON.stringify(["apple"]),
    winner_initial_points: 1800,
    winner_updated_points: 1815,
    loser_initial_points: 1750,
    loser_updated_points: 1740,
    language: "German",
    english_wordlist: JSON.stringify(["apple", "banana", "orange"]),
    non_english_wordlist: JSON.stringify(["apfel", "banane", "orange"]),
  },
  {
    room_id: "testroomid3",
    winner: 1,
    loser: 2,
    winner_correct_answers: JSON.stringify(["apple", "banana"]),
    loser_correct_answers: JSON.stringify(["apple"]),
    winner_initial_points: 1800,
    winner_updated_points: 1815,
    loser_initial_points: 1750,
    loser_updated_points: 1740,
    language: "German",
    english_wordlist: JSON.stringify(["apple", "banana", "orange"]),
    non_english_wordlist: JSON.stringify(["apfel", "banane", "orange"]),
  },
  {
    room_id: "testroomid4",
    winner: 1,
    loser: 2,
    winner_correct_answers: JSON.stringify(["apple", "banana"]),
    loser_correct_answers: JSON.stringify(["apple"]),
    winner_initial_points: 1800,
    winner_updated_points: 1815,
    loser_initial_points: 1750,
    loser_updated_points: 1740,
    language: "German",
    english_wordlist: JSON.stringify(["apple", "banana", "orange"]),
    non_english_wordlist: JSON.stringify(["apfel", "banane", "orange"]),
  },
];
