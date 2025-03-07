import express from "express";
import { errorHandler } from "./middlewares/errorHandler.middleware";
const apiRouter = require("./Routers/apiRouters");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
//endpoint routing
app.use("/api", apiRouter);

//error handling middleware
app.all("*", () => {
  throw new Error("400: Not Found");
});

app.use(errorHandler);

//listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
