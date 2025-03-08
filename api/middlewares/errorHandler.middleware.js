"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var CustomError_1 = require("../utils/CustomError");
var errorHandler = function (error, req, res, next) {
    if (error instanceof CustomError_1.CustomError) {
        res.status(error.StatusCode).json(error.serialize());
    }
    else
        res.status(404).send({ message: "Not Found" });
};
exports.errorHandler = errorHandler;
