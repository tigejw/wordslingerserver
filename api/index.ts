import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";

// Create an Express app and HTTP server
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins or specify your frontend URL here
    methods: ["GET", "POST"],
  },
});

app.use(cors());

// Define types for the players
interface Player {
  correctAnswers: number;
  currentWordIndex: number;
  ready: boolean; // Add ready state to track whether player is ready
}

interface Players {
  [socketId: string]: Player;
}

let players: Players = {};
let wordList: string[] = ["apple", "banana", "orange", "grape", "watermelon"];
let gameInProgress = false;

io.on("connection", (socket: Socket) => {
  console.log(`User connected: ${socket.id}`);

  // Add player to the game with the ready flag set to false
  players[socket.id] = {
    correctAnswers: 0,
    currentWordIndex: 0,
    ready: false,
  };

  console.log("Players currently connected: ", Object.keys(players));

  // Handle when a player signals they're ready to start
  socket.on("playerReady", () => {
    players[socket.id].ready = true;
    console.log(`Player ${socket.id} is ready`);
    console.log(players);
    // Check if both players are ready
    if (
      Object.keys(players).length === 2 &&
      Object.values(players).every((player) => player.ready)
    ) {
      gameInProgress = true;
      io.emit("gameStart", { wordList });
      console.log("Starting game...");
    }
  });

  // Handle player answer submission
  socket.on("submitAnswer", (answer: string) => {
    const player = players[socket.id];
    const currentWord = wordList[player.currentWordIndex];

    if (answer.toLowerCase() === currentWord.toLowerCase()) {
      player.correctAnswers++;
      socket.emit("correctAnswer", { message: "Correct!" });
    } else {
      socket.emit("incorrectAnswer", { message: "Incorrect, try again." });
    }

    // Move to the next word
    player.currentWordIndex++;

    // Check if the player has finished all words
    if (player.currentWordIndex >= wordList.length) {
      console.log(player.currentWordIndex);
      socket.emit("gameComplete", { correctAnswers: player.correctAnswers });
      checkGameEnd();
    } else {
      // Send the next word
      socket.emit("nextWord", { word: wordList[player.currentWordIndex] });
    }
  });

  // Handle player disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    delete players[socket.id];

    // End the game if there are fewer than two players
    if (Object.keys(players).length < 2 && gameInProgress) {
      io.emit("gameOver", { players });
      socket.disconnect();
    }
  });

  // Check if both players have completed the game
  function checkGameEnd() {
    const allPlayersFinished = Object.values(players).every(
      (player) => player.currentWordIndex >= wordList.length
    );

    if (allPlayersFinished) {
      // Determine the winner
      console.log("all players finished");
      let winner: string | null = null;
      let maxCorrectAnswers = 0;
      for (const socketId in players) {
        const player = players[socketId];
        if (player.correctAnswers > maxCorrectAnswers) {
          maxCorrectAnswers = player.correctAnswers;
          winner = socketId;
        }
      }

      io.emit("gameOver", {
        winner,
        correctAnswers: players[winner!].correctAnswers,
      });

      // Reset the game
      resetGame();
    }
  }

  // Reset the game state
  function resetGame() {
    players = {};
    gameInProgress = false;
  }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
