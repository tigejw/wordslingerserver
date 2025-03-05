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

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
