import { Schema, model, Types, Document } from 'mongoose';

export interface IBarber extends Document {
  tenantId: Types.ObjectId;
  name: string;
  schedule: Record<string, [number, number]>;
}

const schema = new Schema<IBarber>({
  tenantId: { type: Schema.Types.ObjectId, required: true, index: true },
  name: { type: String, required: true },
  schedule: { type: Object, default: {} }
});

export default model<IBarber>('Barber', schema);
