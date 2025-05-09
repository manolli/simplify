import { Schema, model, Types, Document } from 'mongoose';

export interface IClient extends Document {
  tenantId: Types.ObjectId;
  name: string;
  phone: string;
  notes?: string;
}

const schema = new Schema<IClient>({
  tenantId: { type: Schema.Types.ObjectId, required: true, index: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  notes: String
});

export default model<IClient>('Client', schema);
