"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorResponse extends Error {
    constructor(message, status) {
        super(message);
        this.statusCode = status;
    }
}
exports.default = ErrorResponse;
