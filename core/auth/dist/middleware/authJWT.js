"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const protect = (req, res, next) => {
    const header = req.headers.authorization;
    if (!(header === null || header === void 0 ? void 0 : header.startsWith('Bearer ')))
        return res.status(401).json({ message: 'No token' });
    try {
        req.user = jsonwebtoken_1.default.verify(header.split(' ')[1], process.env.JWT_SECRET);
        next();
    }
    catch (_a) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
exports.protect = protect;
