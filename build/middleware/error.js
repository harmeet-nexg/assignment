"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandeler = (err, req, res, next) => {
    res.status(500).json({
        success: false,
        data: err,
        error: 'Server Error',
    });
};
exports.default = errorHandeler;
