"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("@models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const authMiddleware = asyncHandler(async (req, res, next) => {
    var _a, _b;
    let token;
    if ((_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded === null || decoded === void 0 ? void 0 : decoded.id);
                req.user = user;
                next();
            }
        }
        catch (error) {
            throw new Error("Not Authorized token expired, Please login again");
        }
    }
    else {
        throw new Error("There is no token attached to header");
    }
});
const isAdmin = asyncHandler(async (req, res, next) => {
    const { email } = req.user;
    const adminUser = await User.findOne({ email });
    if ((adminUser === null || adminUser === void 0 ? void 0 : adminUser.role) !== "admin") {
        throw new Error("You are not an Admin");
    }
    else {
        next();
    }
});
module.exports = { authMiddleware, isAdmin };
