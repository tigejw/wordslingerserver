import express, { Request, Response, NextFunction } from "express";
const apiRouter = require("./Routers/apiRouters");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
//endpoint routing
app.use("/api", apiRouter);

//error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.code === "23502") {
    res.status(400).send({ error: { msg: "Bad request!"} });
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
  res.status(500).send({ error: "Server Error!", msg: err });
});

//listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
