import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import axios from "axios";
import eloRating from "./utils/sr_system";
// Create an Express app and HTTP server
const app = express();
app.use(cors({ origin: "*" }));
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins or specify your frontend URL here
    methods: ["GET", "POST"],
  },
});

type Language = "German" | "Spanish" | "French" | null;
type validLanguage = "German" | "Spanish" | "French";
type LeaderboardResponse = {
  leaderboard_id: number;
  rank: number;
  user_id: number;
  language: validLanguage;
};
// Define types for the players
interface Player {
  correctAnswers: Array<string>;
  currentWordIndex: number;
  user: string;
  ready: boolean; // Add ready state to track whether player is ready
}

interface Players {
  [socketId: string]: Player;
}
//Define GameInstance type
interface GameInstance {
  players: Players;
  timer: number;
  englishTranslations: string[];
  nonEnglishTranslations: string[];
  language: Language;
}

//Define WaitingPlayer type
interface WaitingRoom {
  user: string;
  socketId: string;
  language: Language;
}

interface Word {
  english: string;
  french?: string;
  german?: string;
  spanish?: string;
  image_url: string;
  word_level: number;
}
//Storage for all games, connect to api!!!
let games: { [roomId: string]: GameInstance } = {};

//Const waiting room
let waitingRooms: WaitingRoom[] = [
  { user: "", socketId: "", language: "German" },
  { user: "", socketId: "", language: "Spanish" },
  { user: "", socketId: "", language: "French" },
];

let players: Players = {};

//Const testWordList > connect to api function that gets words
//
//language selector + functionality w api endpoint!
//
//waiting room language based!!!
//
//refactor!!!!!!!
//
//
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
  socket.on(
    "playerReady",
    ({ user, language }: { user: string; language: Language }) => {
      console.log(user + "is ready");
      const waitingRoom: WaitingRoom = waitingRooms.filter((waitingRoom) => {
        return waitingRoom.language === language;
      })[0];

      if (!waitingRoom.user) {
        //check if user in waiting room
        //noone waiting - assign user to waiting room
        waitingRoom.socketId = socket.id;
        waitingRoom.user = user;
        console.log(
          waitingRoom.user + "is waiting in " + waitingRoom.language + " room"
        );
      } else {
        //someone waiting to play - start game

        //create unique room id + assign players to room
        const roomId = `${socket.id}${waitingRoom.socketId}`;
        socket.join(roomId);
        io.sockets.sockets.get(waitingRoom.socketId)?.join(roomId);
        console.log(
          "users joined the " +
            waitingRoom.language +
            " room: " +
            user +
            "and" +
            waitingRoom.user
        );

        //store unique gameInstance in the games object with info on players, answers, wordpool + timer
        return axios
          .get(
            `https://wordslingerserver.onrender.com/api/word-list/${waitingRoom.language?.toLowerCase()}`
          )
          .then(({ data: { words } }) => {
            const englishTranslations = words.map((word: Word) => {
              return word.english;
            });
            const nonEnglishTranslations = words.map((word: Word) => {
              const language = waitingRoom.language;
              return language === "German"
                ? word.german
                : language === "French"
                ? word.french
                : word.spanish;
            });
            console.log(words);

            console.log(englishTranslations, "<<<<  eng translkations");
            games[roomId] = {
              players: {},
              englishTranslations: englishTranslations,
              nonEnglishTranslations: nonEnglishTranslations,
              timer: 30,
              language: waitingRoom.language,
            };
            games[roomId].players[socket.id] = {
              user: user,
              currentWordIndex: 0,
              correctAnswers: [],
              ready: true,
            };
            games[roomId].players[waitingRoom.socketId] = {
              user: waitingRoom.user,
              currentWordIndex: 0,
              correctAnswers: [],
              ready: true,
            };
            //start game sending roomid + wordlist to clients
            io.to(roomId).emit("gameStart", {
              wordList: games[roomId].nonEnglishTranslations,
              roomId: roomId,
            });
            //start server side timer !!!needs syncing is one second ahead of client
            startTimer(roomId);
            console.log("game is starting" + roomId);

            //reset waiting room
            waitingRoom.user = "";
            waitingRoom.socketId = "";
            console.log(waitingRooms);
          })
          .catch((err) => {
            console.log(err, ">><<<<<< api res error");
          });
      }
    }
  );

  // Handle player answer submission
  socket.on(
    "submitAnswer",
    ({ answer, roomId }: { answer: string; roomId: string }) => {
      //access correct game instance
      const gameInstance = games[roomId];

      //find the currentword the user is answering
      const currentWordIndex = gameInstance.players[socket.id].currentWordIndex;
      const currentWord = gameInstance.englishTranslations[currentWordIndex];

      //check if inputted answer is correct
      if (answer.toLowerCase() === currentWord.toLowerCase()) {
        //if correct +1 to users currentwordindex and push answer to correct answers in players object in game instance
        gameInstance.players[socket.id].currentWordIndex++;
        gameInstance.players[socket.id].correctAnswers.push(answer);
        //signal correct answer to client
        socket.emit("correctAnswer", { message: "Correct!" });
        //signal next word to client sending next word
        socket.emit("nextWord", {
          word: gameInstance.nonEnglishTranslations[
            gameInstance.players[socket.id].currentWordIndex
          ],
        });
      } else {
        //signal incorrect answer to client
        socket.emit("incorrectAnswer", { message: "Incorrect, try again." });
      }
    }
  );

  //function to end the game
  function endGame(roomId: string) {
    //access specific game instance, players + playerIds
    const gameInstance = games[roomId];
    const gamePlayers = gameInstance.players;
    const playersocketIds = Object.keys(gamePlayers);

    //create winner socketid string
    let winnerSocketId: string | null = null;

    //create loser socket id string
    let loserSocketId: string | null = null;

    //check who got most answers + assign winner to that person
    if (
      gameInstance.players[playersocketIds[0]].correctAnswers.length ===
      gameInstance.players[playersocketIds[1]].correctAnswers.length
    ) {
      const coinflip = Math.floor(Math.random() * 2);

      winnerSocketId = playersocketIds[coinflip];
      loserSocketId = playersocketIds.filter((socketid) => {
        return socketid !== winnerSocketId;
      })[0];
    } else if (
      gameInstance.players[playersocketIds[0]].correctAnswers.length >
      gameInstance.players[playersocketIds[1]].correctAnswers.length
    ) {
      winnerSocketId = playersocketIds[0];
      loserSocketId = playersocketIds[1];
    } else {
      winnerSocketId = playersocketIds[1];
      loserSocketId = playersocketIds[0];
    }

    const winnerUsername = gamePlayers[winnerSocketId].user;
    const loserUsername = gamePlayers[loserSocketId].user;

    //emit game over to client + send winner and game data
    io.to(roomId).emit("gameOver", {
      winnerUsername,
      gameInstance,
    });
    let winnerUserId: string | null = null;
    let loserUserId: string | null = null;

    let winner_initial_points: number | null = null;
    let loser_initial_points: number | null = null;

    let winner_updated_points: number | null = null;
    let loser_updated_points: number | null = null;
    axios
      .get(`https://wordslingerserver.onrender.com/api/users/${winnerUsername}`)
      .then(({ data: { user } }) => {
        console.log(user, "< res from first");
        winnerUserId = user[0].user_id;
        return;
      })
      .then(() => {
        return axios.get(
          `https://wordslingerserver.onrender.com/api/users/${loserUsername}`
        );
      })
      .then(({ data: { user } }) => {
        console.log(user, "<res from second");
        loserUserId = user[0].user_id;
        console.log(winnerSocketId, "<winner loser>", loserSocketId);
        return axios.get(
          `https://wordslingerserver.onrender.com/api/leaderboard/${winnerUserId}/${gameInstance.language}`
        );
      })
      .then(({ data: { leaderboardEntry } }) => {
        winner_initial_points = leaderboardEntry.rank;
        return axios.get(
          `https://wordslingerserver.onrender.com/api/leaderboard/${loserUserId}/${gameInstance.language}`
        );
      })
      .then(({ data: { leaderboardEntry } }) => {
        loser_initial_points = leaderboardEntry.rank;
        if (!winner_initial_points || !loser_initial_points) {
          return;
        }
        const eloRatingResults = eloRating(
          winner_initial_points,
          loser_initial_points,
          1
        );
        console.log(eloRatingResults, "<eloratingresults");
        winner_updated_points = eloRatingResults[0];
        loser_updated_points = eloRatingResults[1];
        if (!winnerSocketId || !loserSocketId) {
          return;
        }
        console.log(
          "roomid",
          roomId,
          "loser",
          loserUserId,
          "winner",
          winnerUserId,
          "winner_initial_points",
          winner_initial_points,
          "winner_updated_points",
          winner_updated_points,
          "loser_initial_points",
          loser_initial_points,
          "loser_updated_points",
          loser_updated_points,
          "language",
          gameInstance.language,
          "english_wordlist",
          gameInstance.englishTranslations,
          "non_english_wordlist",
          gameInstance.nonEnglishTranslations,
          "winner_correct_answers",
          gameInstance.players[winnerSocketId].correctAnswers,
          "loser_correct_answers",
          gameInstance.players[loserSocketId].correctAnswers
        );
        return axios.post("https://wordslingerserver.onrender.com/api/games", {
          room_id: roomId,
          winner: winnerUserId,
          loser: loserUserId,
          winner_initial_points: winner_initial_points,
          winner_updated_points: winner_updated_points,
          loser_initial_points: loser_initial_points,
          loser_updated_points: loser_updated_points,
          language: gameInstance.language,
          english_wordlist: gameInstance.englishTranslations,
          non_english_wordlist: gameInstance.nonEnglishTranslations,
          winner_correct_answers:
            gameInstance.players[winnerSocketId].correctAnswers,
          loser_correct_answers:
            gameInstance.players[loserSocketId].correctAnswers,
        });
      })
      .then((res) => {
        console.log(res);
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }

  //timer function server side
  function startTimer(roomId: string) {
    for (let i = 0; i <= games[roomId].timer; i++) {
      setTimeout(() => {
        games[roomId].timer--;
        console.log(games[roomId].timer);
        if (games[roomId].timer === 0) {
          //at zero trigger endgame
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
