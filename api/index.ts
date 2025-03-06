import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import { Zoom } from "swiper";

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
  correctAnswers: Array<string>;
  currentWordIndex: number;
  ready: boolean; // Add ready state to track whether player is ready
}

interface Players {
  [socketId: string]: Player;
}

interface GameInstance {
  players: Players;
  timer: number;
  wordList: string[];
}

let games: { [roomId: string]: GameInstance } = {};
let waitingPlayer = "";

let players: Players = {};
let testWordList: string[] = [
  "apple",
  "banana",
  "orange",
  "grape",
  "watermelon",
];

io.on("connection", (socket: Socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle when a player signals they're ready to start
  socket.on("playerReady", () => {
    if (!waitingPlayer) {
      waitingPlayer = socket.id;
      console.log(socket.id + "is waiting");
    } else {
      const roomId = `${socket.id}${waitingPlayer}`;
      socket.join(roomId);
      io.sockets.sockets.get(waitingPlayer)?.join(roomId);
      console.log(
        "users joined the room" + socket.id + "waiting player" + waitingPlayer
      );
      io.to(roomId).emit("inroom");
      games[roomId] = {
        players: {},
        wordList: testWordList,
        timer: 30,
      };
      games[roomId].players[socket.id] = {
        currentWordIndex: 0,
        correctAnswers: [],
        ready: true,
      };
      games[roomId].players[waitingPlayer] = {
        currentWordIndex: 0,
        correctAnswers: [],
        ready: true,
      };
      io.emit("gameStart", {
        wordList: games[roomId].wordList,
        roomId: roomId,
      });
      startTimer(roomId);
      console.log("game is starting" + roomId);
      waitingPlayer = "";
    }
  });

  // Handle player answer submission
  socket.on(
    "submitAnswer",
    ({ answer, roomId }: { answer: string; roomId: string }) => {
      const gameInstance = games[roomId];
      console.log(roomId + "room id");
      console.log(socket.id + " socket id");
      console.log(gameInstance);
      const currentWordIndex = gameInstance.players[socket.id].currentWordIndex;
      console.log("here is the socket id", socket.id);
      const currentWord = gameInstance.wordList[currentWordIndex];
      console.log("index 1" + gameInstance.players[socket.id].currentWordIndex);
      if (answer.toLowerCase() === currentWord.toLowerCase()) {
        gameInstance.players[socket.id].currentWordIndex++;
        gameInstance.players[socket.id].correctAnswers.push(answer);

        socket.emit("correctAnswer", { message: "Correct!" });
      } else {
        socket.emit("incorrectAnswer", { message: "Incorrect, try again." });
      }

      console.log("index" + gameInstance.players[socket.id].currentWordIndex);
      socket.emit("nextWord", {
        word: gameInstance.wordList[
          gameInstance.players[socket.id].currentWordIndex
        ],
      });
    }
  );

  // Check if both players have completed the game
  function endGame(roomId: string) {
    const gameInstance = games[roomId];
    console.log(roomId);
    console.log(gameInstance);
    const gamePlayers = gameInstance.players;
    const gameIds = Object.keys(gamePlayers);
    let winner: string | null = null;
    if (
      gameInstance.players[gameIds[0]].correctAnswers.length >
      gameInstance.players[gameIds[1]].correctAnswers.length
    ) {
      winner = gameIds[0];
    } else {
      winner = gameIds[1]; // account for draw
    }

    io.to(roomId).emit("gameOver", {
      winner,
      gameInstance,
    });
  }

  function startTimer(roomId: string) {
    for (let i = 0; i <= games[roomId].timer; i++) {
      setTimeout(() => {
        games[roomId].timer--;
        console.log(games[roomId].timer);
        if (games[roomId].timer === 0) {
          console.log("this if statement is working");
          endGame(roomId);
        }
      }, i * 1000);
    }
  }

  // Handle player disconnect
  socket.on("disconnect", (roomId: string) => {
    console.log(`User disconnected: ${socket.id}`);
    delete players[socket.id];

    //endGame(roomId);
    //if player disconnect, the other player in the room will win and we close room
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
