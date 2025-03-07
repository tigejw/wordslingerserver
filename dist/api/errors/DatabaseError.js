"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseError = void 0;
const CustomError_1 = require("../utils/CustomError");
class DatabaseError extends CustomError_1.CustomError {
    constructor(message) {
        super("Database crashed");
        this.message = message;
        this.StatusCode = 500;
        Object.setPrototypeOf(this, DatabaseError.prototype);
    }
    serialize() {
        return { message: this.message };
    }
}
exports.DatabaseError = DatabaseError;
