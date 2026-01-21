import DashboardLayout from '../../layouts/DashboardLayout';

export default function Bookings() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-semibold text-white tracking-tight">
        Bookings
      </h1>

      <p className="mt-2 text-white/60">
        See who has booked time with you.
      </p>

      <div className="mt-8 p-6 rounded-xl bg-white/5 border border-white/10">
        <p className="text-white/60 text-sm">
          No bookings yet.
        </p>
      </div>
    </DashboardLayout>
  );
}
