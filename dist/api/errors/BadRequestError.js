"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = void 0;
const CustomError_1 = require("../utils/CustomError");
class BadRequest extends CustomError_1.CustomError {
    constructor(message) {
        super(message);
        this.message = message;
        this.StatusCode = 400;
        Object.setPrototypeOf(this, BadRequest.prototype);
    }
    serialize() {
        return { message: "Bad Request" };
    }
}
exports.BadRequest = BadRequest;
