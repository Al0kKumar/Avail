import { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/Button';
import Toast from '../../components/Toast';
import { saveAvailability } from '../../features/availability/availability.api';

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const DAY_TO_INDEX = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

export default function Availability() {
  const [availability, setAvailability] = useState(
    DAYS.map(day => ({
      day,
      enabled: day !== 'Saturday' && day !== 'Sunday',
      start: '09:00',
      end: '17:00',
    }))
  );

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const toggleDay = index => {
    setAvailability(prev =>
      prev.map((d, i) =>
        i === index ? { ...d, enabled: !d.enabled } : d
      )
    );
  };

  const updateTime = (index, field, value) => {
    setAvailability(prev =>
      prev.map((d, i) =>
        i === index ? { ...d, [field]: value } : d
      )
    );
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const rules = availability
        .filter(d => d.enabled)
        .map(d => {
          if (d.start >= d.end) {
            throw new Error(
              `Invalid time range for ${d.day}`
            );
          }

          return {
            dayOfWeek: DAY_TO_INDEX[d.day],
            startTime: d.start,
            endTime: d.end,
            isActive: true,
          };
        });

      if (rules.length === 0) {
        throw new Error('Enable at least one day');
      }

      await saveAvailability({ rules });

      setToast({
        type: 'success',
        message: 'Availability saved successfully',
      });
    } catch (err) {
      setToast({
        type: 'error',
        message:
          err instanceof Error
            ? err.message
            : 'Failed to save availability',
      });
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 2000);
    }
  };

  return (
    <DashboardLayout>
      <Toast
        show={!!toast}
        type={toast?.type}
        message={toast?.message}
      />

      {/* Header */}
      <h1 className="text-3xl font-semibold tracking-tight text-white">
        Availability
      </h1>
      <p className="mt-2 text-white/60">
        Set when people can book time with you.
      </p>

      {/* Editor */}
      <div className="mt-10 space-y-4">
        {availability.map((day, index) => (
          <div
            key={day.day}
            className="
              flex items-center justify-between
              rounded-xl
              bg-white/5
              backdrop-blur
              border border-white/10
              px-6 py-4
            "
          >
            {/* Day + toggle */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => toggleDay(index)}
                className={`
                  w-10 h-6 rounded-full transition
                  ${day.enabled ? 'bg-emerald-500' : 'bg-white/20'}
                `}
              >
                <span
                  className={`
                    block h-5 w-5 rounded-full bg-black transition
                    ${day.enabled ? 'translate-x-5' : 'translate-x-1'}
                  `}
                />
              </button>

              <span
                className={`text-sm font-medium ${
                  day.enabled ? 'text-white' : 'text-white/40'
                }`}
              >
                {day.day}
              </span>
            </div>

            {/* Time selectors */}
            <div className="flex items-center gap-3">
              <input
                type="time"
                value={day.start}
                disabled={!day.enabled}
                onChange={e =>
                  updateTime(index, 'start', e.target.value)
                }
                className="
                  bg-white/10
                  text-white
                  text-sm
                  rounded-lg
                  px-3 py-1.5
                  border border-white/10
                  disabled:opacity-40
                "
              />

              <span className="text-white/40">–</span>

              <input
                type="time"
                value={day.end}
                disabled={!day.enabled}
                onChange={e =>
                  updateTime(index, 'end', e.target.value)
                }
                className="
                  bg-white/10
                  text-white
                  text-sm
                  rounded-lg
                  px-3 py-1.5
                  border border-white/10
                  disabled:opacity-40
                "
              />
            </div>
          </div>
        ))}
      </div>

      {/* Save */}
      <div className="mt-10">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="
            relative
            min-w-[200px]
            cursor-pointer
          "
        >
          {saving && (
            <span className="absolute left-4 h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          )}
          {saving ? 'Saving…' : 'Save availability'}
        </Button>
      </div>
    </DashboardLayout>
  );
}
