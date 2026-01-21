import DashboardLayout from '../../layouts/DashboardLayout';

export default function DashboardHome() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-semibold text-white tracking-tight">
        Dashboard
      </h1>

      <p className="mt-2 text-white/60">
        Share your booking link and manage your schedule.
      </p>

      {/* Cards */}
      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <h3 className="text-sm text-white/60 mb-2">
            Your booking link
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-white text-sm truncate">
              avail.com/your-name
            </span>
            <button className="text-emerald-400 text-sm">
              Copy
            </button>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <h3 className="text-sm text-white/60 mb-2">
            Upcoming bookings
          </h3>
          <p className="text-white text-lg font-medium">
            0
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
