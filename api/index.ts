import { Request, Response, NextFunction } from "express";
import express from "express";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import apiRouter from "./Routers/apiRouters";
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

//endpoint routing
app.use("/api", apiRouter);

//invalid URL handling
app.all("/*", (req, res) => {
  res.status(404).send({ error: "Invalid URL", req: req });
});

//error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.code === "23502" || err.code === "22P02") {
    res.status(400).send({ error: "Bad request!", err: err });
  } else {
    next(err);
  }
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ error: err.msg, err: err });
  } else next(err);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err, "<<< handle this");
  res.status(500).send({ error: "Server Error!", msg: err });
});

app.use(errorHandler);

//listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
