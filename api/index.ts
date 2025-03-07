import express from "express";
import { errorHandler } from "./middlewares/errorHandler.middleware";
const apiRouter = require("./Routers/apiRouters");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
//endpoint routing
app.use("/api", apiRouter);

//invalid URL handling
app.all("/*", (req, res) => {
  res.status(404).send({ error: "Invalid URL" });
});
//error handling middleware

app.use(errorHandler);

// app.all("*", () => {
//   throw new Error("400: Not Found");
// });

//listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
