import { Request, Response, NextFunction } from "express";
import express from "express";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import apiRouter from "./Routers/apiRouters";
const PORT = process.env.PORT || 3000;
import cors from "cors";

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());

console.log("index before /api router");
//endpoint routing
app.use("/api", apiRouter);
console.log("index after /api router before invalid url check");
//invalid URL handling
app.all("/*", (req, res) => {
  res.status(404).send({ error: "Invalid URL!" });
});

//error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log("in errorhandling ");
  if (err.code === "23502" || err.code === "22P02") {
    res.status(400).send({ error: "Bad request!" });
  } else {
    next(err);
  }
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ error: err.msg });
  } else next(err);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err, "<<< handle this");
  res.status(500).send({ error: "Server Error!" });
});

// app.use(errorHandler);

//listening
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

module.exports = app;
