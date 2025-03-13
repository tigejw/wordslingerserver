export default function eloRating(
  rating1: number,
  rating2: number,
  winner: 0 | 1
) {
  //input initial ratings of two players + winner is 1 for player1 win 0 for player 2 win.

  function getK(rating: number): number {
    if (rating < 1000) return 50;
    if (rating < 1500) return 40;
    if (rating < 2000) return 30;
    if (rating < 2500) return 20;
    return 10;
  }
  const k1 = getK(rating1);
  const k2 = getK(rating2);
  const k = Math.min(k1, k2);

  //function calculates probability of players winning
  function probability(rating1: number, rating2: number): number {
    return 1 / (1 + Math.pow(10, (rating1 - rating2) / 400));
  }

  let probabilty2wins = probability(rating1, rating2);
  let probability1wins = probability(rating2, rating1);
  rating1 = rating1 + k * (winner - probability1wins);
  rating2 = rating2 + k * (1 - winner - probabilty2wins);
  console.log(`updatedrankings player1=${rating1}, player2=${rating2}`);
  return [Math.floor(rating1), Math.floor(rating2)];
}
