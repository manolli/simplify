import { Schema, model, Types, Document } from 'mongoose';

export interface IClient extends Document {
  tenantId: Types.ObjectId;
  name: string;
  phone: string;
  email?: string;
  notes?: string;
  createdAt: Date;
}

const schema = new Schema<IClient>({
  tenantId: { type: Schema.Types.ObjectId, required: true, index: true },
  name: { type: String, required: [true,'O nome é obrigatório'] },
  phone: { type: String, required: true },
  email: { type: String, required: [true,'O e-mail é obrigatório'] },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

export default model<IClient>('Client', schema);
