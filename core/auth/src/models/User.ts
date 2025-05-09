// src/models/User.ts
import { Schema, model, Types, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  tenantId: Types.ObjectId;           // ← troque string ➜ ObjectId
  role: 'admin' | 'staff';
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  tenantId: {
    type: Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true
  },
  role: { type: String, enum: ['admin', 'staff'], default: 'admin' },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

// hook tipado
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default model<IUser>('User', userSchema);
