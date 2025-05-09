import { Schema, model, Types, Document } from 'mongoose';

export interface IService extends Document {
  tenantId: Types.ObjectId;
  name: string;
  durationMin: number;
  price: number;
}

const schema = new Schema<IService>({
  tenantId: { type: Schema.Types.ObjectId, required: true, index: true },
  name: { type: String, required: true },
  durationMin: { type: Number, required: true },
  price: { type: Number, required: true }
});

export default model<IService>('Service', schema);
