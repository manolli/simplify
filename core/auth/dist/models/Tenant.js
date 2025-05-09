"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/Tenant.ts
const mongoose_1 = require("mongoose");
const tenantSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    verticalId: { type: String, required: true },
    plan: { type: String, default: 'free' },
    createdAt: { type: Date, default: Date.now }
});
exports.default = (0, mongoose_1.model)('Tenant', tenantSchema);
