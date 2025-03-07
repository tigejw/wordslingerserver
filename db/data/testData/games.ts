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
    wordlist: JSON.stringify(["apple", "banana", "orange"]),
    winner_correct_answers: JSON.stringify(["apple", "banana"]),
    loser_correct_answers: JSON.stringify(["apple"]),
  },
  {
    room_id: "testroomid2",
    winner: 1,
    loser: 2,
    wordlist: JSON.stringify(["apple", "banana", "orange"]),
    winner_correct_answers: JSON.stringify(["apple", "banana"]),
    loser_correct_answers: JSON.stringify(["apple"]),
  },
  {
    room_id: "testroomid3",
    winner: 1,
    loser: 2,
    wordlist: JSON.stringify(["apple", "banana", "orange"]),
    winner_correct_answers: JSON.stringify(["apple", "banana"]),
    loser_correct_answers: JSON.stringify(["apple"]),
  },
  {
    room_id: "testroomid4",
    winner: 1,
    loser: 2,
    wordlist: JSON.stringify(["apple", "banana", "orange"]),
    winner_correct_answers: JSON.stringify(["apple", "banana"]),
    loser_correct_answers: JSON.stringify(["apple"]),
  },
];
