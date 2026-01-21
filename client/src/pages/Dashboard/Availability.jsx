import { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/Button';

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default function Availability() {
  const [availability, setAvailability] = useState(
    DAYS.map(day => ({
      day,
      enabled: day !== 'Saturday' && day !== 'Sunday',
      start: '09:00',
      end: '17:00',
    }))
  );

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

  return (
    <DashboardLayout>
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
        <Button>Save availability</Button>
      </div>
    </DashboardLayout>
  );
}
