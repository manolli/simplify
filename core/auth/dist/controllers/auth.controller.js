"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.login = exports.signup = void 0;
const Tenant_1 = __importDefault(require("../models/Tenant"));
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const signToken = (payload) => jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tenantName, verticalId = 'BARBERSHOP', email, password } = req.body;
    if (!tenantName || !email || !password)
        return res.status(400).json({ message: 'Missing fields' });
    const tenant = yield Tenant_1.default.create({ name: tenantName, verticalId });
    const user = yield User_1.default.create({ tenantId: tenant._id, email, password });
    const token = signToken({
        id: user._id,
        tenantId: tenant._id,
        role: user.role
    });
    res.status(201).json({ token });
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ email });
    if (!user)
        return res.status(401).json({ message: 'Invalid creds' });
    const match = yield bcryptjs_1.default.compare(password, user.password);
    if (!match)
        return res.status(401).json({ message: 'Invalid creds' });
    const token = signToken({
        id: user._id,
        tenantId: user.tenantId,
        role: user.role
    });
    res.json({ token });
});
exports.login = login;
const profile = (req, res) => {
    res.json(req.user); // agora o TS reconhece
};
exports.profile = profile;
