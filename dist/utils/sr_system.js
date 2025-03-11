"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = eloRating;
function eloRating(rating1, rating2, winner) {
    //input initial ratings of two players + winner is 1 for player1 win 0 for player 2 win.
    const k = 30;
    //function calculates probability of players winning
    function probability(rating1, rating2) {
        return 1 / (1 + Math.pow(10, (rating1 - rating2) / 400));
    }
    let probabilty1 = probability(rating1, rating2);
    let probability2 = probability(rating2, rating1);
    rating1 = rating1 + k * (winner - probabilty1);
    rating2 = rating2 + k * (1 - winner - probability2);
    console.log(`updatedrankings player1=${rating1}, player2=${rating2}`);
    return [Math.floor(rating1), Math.floor(rating2)];
}
