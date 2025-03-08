"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var errorHandler_middleware_1 = require("./middlewares/errorHandler.middleware");
var apiRouter = require("./Routers/apiRouters");
var PORT = process.env.PORT || 3000;
var app = (0, express_1.default)();
app.use(express_1.default.json());
//endpoint routing
app.use("/api", apiRouter);
//invalid URL handling
app.all("/*", function (req, res) {
    res.status(404).send({ error: "Invalid URL" });
});
//error handling middleware
app.use(function (err, req, res, next) {
    if (err.code === "23502" || err.code === "22P02") {
        res.status(400).send({ error: "Bad request!" });
    }
    else {
        next(err);
    }
});
app.use(function (err, req, res, next) {
    if (err.status && err.msg) {
        res.status(err.status).send({ error: err.msg });
    }
    else
        next(err);
});
app.use(function (err, req, res, next) {
    console.log(err, "<<< handle this");
    res.status(500).send({ error: "Server Error!", msg: err });
});
app.use(errorHandler_middleware_1.errorHandler);
// app.all("*", () => {
//   throw new Error("400: Not Found");
// });
//listening
module.exports = app;
