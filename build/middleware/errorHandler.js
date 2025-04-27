"use strict";
// not Found Handler
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res, next) => {
    const error = new Error(`Not Found: ${req.originalUrl}`);
    res.status(404);
    next(error);
};
// Error Handler
const errorHandler = (err, req, res, next) => {
    const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statuscode);
    res.json({
        message: err === null || err === void 0 ? void 0 : err.message,
        stack: err === null || err === void 0 ? void 0 : err.stack
    });
};
module.exports = { errorHandler, notFound };
