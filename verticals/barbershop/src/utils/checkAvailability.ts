import Appointment from '../models/Appointment';

export const isSlotAvailable = async (
  tenantId: string,
  barberId: string,
  date: Date,
  durationMin: number
) => {
  const start = date;
  const end = new Date(start.getTime() + durationMin * 60000);

  return !(await Appointment.exists({
    tenantId,
    barberId,
    date: { $lt: end },
    $expr: {
      $gt: [
        { $add: ['$date', { $multiply: ['$durationMin', 60000] }] },
        start
      ]
    }
  }));
};
