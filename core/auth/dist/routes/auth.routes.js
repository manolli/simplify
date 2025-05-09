"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.routes.ts
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const authJWT_1 = require("../middleware/authJWT");
const router = (0, express_1.Router)();
router.post('/signup', auth_controller_1.signup);
router.post('/login', auth_controller_1.login);
router.get('/profile', authJWT_1.protect, (req, res) => (0, auth_controller_1.profile)(req, res));
router.get('/health', (_, res) => res.json({ ok: true }));
exports.default = router;
