"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiRouters_1 = __importDefault(require("./Routers/apiRouters"));
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
console.log("index before /api router");
//endpoint routing
app.use("/api", apiRouters_1.default);
console.log("index after /api router before invalid url check");
//invalid URL handling
app.all("/*", (req, res) => {
    res.status(404).send({ error: "Invalid URL!" });
});
//error handling middleware
app.use((err, req, res, next) => {
    console.log("in errorhandling ");
    if (err.code === "23502" || err.code === "22P02") {
        res.status(400).send({ error: "Bad request!" });
    }
    else {
        next(err);
    }
});
app.use((err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ error: err.msg });
    }
    else
        next(err);
});
app.use((err, req, res, next) => {
    console.log(err, "<<< handle this");
    res.status(500).send({ error: "Server Error!" });
});
// app.use(errorHandler);
//listening
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = app;
