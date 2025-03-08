"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
// Create an Express app and HTTP server
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*", // Allow all origins or specify your frontend URL here
        methods: ["GET", "POST"],
    },
});
app.use((0, cors_1.default)());
//Storage for all games, connect to api!!!
let games = {};
//Const waiting room
let waitingPlayer = { user: "", socketId: "" };
let players = {};
//Const testWordList > connect to api function that gets words
let testWordList = [
    "apple",
    "banana",
    "orange",
    "grape",
    "watermelon",
];
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    // Handle when a player signals they're ready to start
    socket.on("playerReady", ({ user }) => {
        var _a;
        console.log(user + "is ready");
        //check if user in waiting room
        if (!waitingPlayer.user) {
            //noone waiting - assign user to waiting room
            waitingPlayer.socketId = socket.id;
            waitingPlayer.user = user;
            console.log(waitingPlayer.user + "is waiting");
        }
        else {
            //someone waiting to play - start game
            //create unique room id + assign players to room
            const roomId = `${socket.id}${waitingPlayer.socketId}`;
            socket.join(roomId);
            (_a = io.sockets.sockets.get(waitingPlayer.socketId)) === null || _a === void 0 ? void 0 : _a.join(roomId);
            console.log("users joined the room" +
                user +
                "and" +
                waitingPlayer.user +
                "joined from the waiting room");
            //store unique gameInstance in the games object with info on players, answers, wordpool + timer
            games[roomId] = {
                players: {},
                wordList: testWordList,
                timer: 30,
            };
            games[roomId].players[socket.id] = {
                user: user,
                currentWordIndex: 0,
                correctAnswers: [],
                ready: true,
            };
            games[roomId].players[waitingPlayer.socketId] = {
                user: waitingPlayer.user,
                currentWordIndex: 0,
                correctAnswers: [],
                ready: true,
            };
            //start game sending roomid + wordlist to clients
            io.emit("gameStart", {
                wordList: games[roomId].wordList,
                roomId: roomId,
            });
            //start server side timer !!!needs syncing is one second ahead of client
            startTimer(roomId);
            console.log("game is starting" + roomId);
            //reset waiting room
            waitingPlayer.user = "";
            waitingPlayer.socketId = "";
        }
    });
    // Handle player answer submission
    socket.on("submitAnswer", ({ answer, roomId }) => {
        //access correct game instance
        const gameInstance = games[roomId];
        //find the currentword the user is answering
        const currentWordIndex = gameInstance.players[socket.id].currentWordIndex;
        const currentWord = gameInstance.wordList[currentWordIndex];
        //check if inputted answer is correct
        if (answer.toLowerCase() === currentWord.toLowerCase()) {
            //if correct +1 to users currentwordindex and push answer to correct answers in players object in game instance
            gameInstance.players[socket.id].currentWordIndex++;
            gameInstance.players[socket.id].correctAnswers.push(answer);
            //signal correct answer to client
            socket.emit("correctAnswer", { message: "Correct!" });
            //signal next word to client sending next word
            socket.emit("nextWord", {
                word: gameInstance.wordList[gameInstance.players[socket.id].currentWordIndex],
            });
        }
        else {
            //signal incorrect answer to client
            socket.emit("incorrectAnswer", { message: "Incorrect, try again." });
        }
    });
    //function to end the game
    function endGame(roomId) {
        //access specific game instance, players + playerIds
        const gameInstance = games[roomId];
        const gamePlayers = gameInstance.players;
        const playerIds = Object.keys(gamePlayers);
        //create winner string
        let winner = null;
        //check who got most answers + assign winner to that person
        if (gameInstance.players[playerIds[0]].correctAnswers.length ===
            gameInstance.players[playerIds[1]].correctAnswers.length) {
            const users = [
                gameInstance.players[playerIds[0]].user,
                gameInstance.players[playerIds[1]].user,
            ];
            const coinflip = Math.floor(Math.random() * 2);
            winner = users[coinflip];
        }
        else if (gameInstance.players[playerIds[0]].correctAnswers.length >
            gameInstance.players[playerIds[1]].correctAnswers.length) {
            winner = gameInstance.players[playerIds[0]].user;
        }
        else {
            winner = gameInstance.players[playerIds[1]].user;
        }
        //emit game over to client + send winner and game data
        io.to(roomId).emit("gameOver", {
            winner,
            gameInstance,
        });
    }
    //timer function server side
    function startTimer(roomId) {
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
    socket.on("disconnect", (roomId) => {
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
