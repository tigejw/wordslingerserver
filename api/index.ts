import express, { Request, Response } from "express";
const apiRouter = require("./Routers/apiRouters");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

//endpoint routing
app.use("/api", apiRouter);

//error handling middleware

//listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
