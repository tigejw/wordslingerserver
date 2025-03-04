import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
const apiRouter = require("./Routers/apiRouters");

// Create Express App and Socket.IO server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins or specify your frontend URL here
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

// Game state
let players: { [socketId: string]: { score: number; name: string } } = {}; // Track player scores
let currentWord: string = "";
let currentTurn: string = ""; // ID of the player whose turn it is
const words = [
  "apple",
  "banana",
  "grape",
  "orange",
  "mango",
  "peach",
  "pear",
  "plum",
];

// Helper function to get a random word
const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

// Handle socket connection
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // Register player when they connect
  players[socket.id] = {
    score: 0,
    name: `Player ${Object.keys(players).length + 1}`,
  };

  // Start the game when two players are connected
  if (Object.keys(players).length === 2) {
    currentWord = getRandomWord();
    currentTurn = Object.keys(players)[0]; // First player's turn
    io.emit("startGame", { currentWord, currentTurn, players });
  }

  // Handle word typed event
  socket.on("wordTyped", (data) => {
    const { word } = data;

    // Only allow the player whose turn it is to submit the word
    if (
      socket.id === currentTurn &&
      word.toLowerCase() === currentWord.toLowerCase()
    ) {
      players[socket.id].score++; // Increase player's score
      currentWord = getRandomWord(); // Get new word

      // Switch turn to the next player
      currentTurn =
        Object.keys(players).find((id) => id !== currentTurn) || currentTurn;

      // Emit game state update, including whose turn it is
      io.emit("updateGameState", { currentWord, currentTurn, players });
    }
  });

  // Handle player disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete players[socket.id];

    // End game if a player disconnects
    if (Object.keys(players).length < 2) {
      io.emit("gameOver", { players });
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
