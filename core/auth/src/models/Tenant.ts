// src/models/Tenant.ts
import { Schema, model } from 'mongoose';

export interface ITenant {
  name: string;
  verticalId: string;          // BARBERSHOP, CONVENIENCE...
  plan: string;                // free, pro...
  createdAt: Date;
}

const tenantSchema = new Schema<ITenant>({
  name: { type: String, required: true },
  verticalId: { type: String, required: true },
  plan: { type: String, default: 'free' },
  createdAt: { type: Date, default: Date.now }
});

export default model<ITenant>('Tenant', tenantSchema);
