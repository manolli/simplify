import { Schema, model, Types, Document } from 'mongoose';

export interface IAppointment extends Document {
  tenantId: Types.ObjectId;
  serviceId: Types.ObjectId;
  barberId: Types.ObjectId;
  clientId: Types.ObjectId;
  date: Date;
  durationMin: number;
  status: 'pending' | 'confirmed' | 'done' | 'cancelled';
}

const schema = new Schema<IAppointment>({
  tenantId: { type: Schema.Types.ObjectId, required: true, index: true },
  serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  barberId: { type: Schema.Types.ObjectId, ref: 'Barber', required: true },
  clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  date: { type: Date, required: true },
  durationMin: { type: Number, required: true },
  status: { type: String, default: 'confirmed' }
});

export default model<IAppointment>('Appointment', schema);
