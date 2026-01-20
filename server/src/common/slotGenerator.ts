import { addMinutes, isBefore } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';


type AvailabilityRule = {
  dayOfWeek: number; // 0–6
  startTime: string; // "10:00"
  endTime: string;   // "17:00"
};

type Booking = {
  startTimeUTC: Date;
  endTimeUTC: Date;
};

type GenerateSlotsInput = {
  rules: AvailabilityRule[];
  date: string; // "2026-01-20"
  timezone: string; // "Asia/Kolkata"
  slotDuration: number; // minutes
  existingBookings: Booking[];
};

export const generateSlots = ({
  rules,
  date,
  timezone,
  slotDuration,
  existingBookings,
}: GenerateSlotsInput) => {
  const slots: { startUTC: Date; endUTC: Date }[] = [];

  const targetDate = new Date(date);
  const dayOfWeek = targetDate.getDay();

  const dayRules = rules.filter(r => r.dayOfWeek === dayOfWeek);

  for (const rule of dayRules) {
    const [startHourStr, startMinStr] = rule.startTime.split(':');
    const [endHourStr, endMinStr] = rule.endTime.split(':');

    if (
    startHourStr === undefined ||
    startMinStr === undefined ||
    endHourStr === undefined ||
    endMinStr === undefined
    ) {
    throw new Error('Invalid availability time format');
    }

    const startHour = Number(startHourStr);
    const startMin = Number(startMinStr);
    const endHour = Number(endHourStr);
    const endMin = Number(endMinStr);


    let localStart = new Date(date);
    localStart.setHours(startHour, startMin, 0, 0);

    const localEnd = new Date(date);
    localEnd.setHours(endHour, endMin, 0, 0);

    let current = fromZonedTime(localStart, timezone);
    const endUTC = fromZonedTime(localEnd, timezone);


    while (isBefore(addMinutes(current, slotDuration), endUTC)) {
      const slotEnd = addMinutes(current, slotDuration);

      const overlaps = existingBookings.some(
        booking =>
          booking.startTimeUTC < slotEnd &&
          booking.endTimeUTC > current
      );

      if (!overlaps) {
        slots.push({
          startUTC: current,
          endUTC: slotEnd,
        });
      }

      current = slotEnd;
    }
  }

  return slots;
};
