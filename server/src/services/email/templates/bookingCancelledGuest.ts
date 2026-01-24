export const bookingCancelledGuestEmail = ({
  guestName,
  hostName,
  date,
  startTime,
  endTime,
}: {
  guestName: string;
  hostName: string;
  date: string;
  startTime: string;
  endTime: string;
}) => `
  <div style="
    background-color:#0b0f14;
    padding:40px 0;
    font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
  ">
    <div style="
      max-width:520px;
      margin:0 auto;
      background:#111827;
      border-radius:14px;
      padding:32px;
      color:#e5e7eb;
      box-shadow:0 10px 30px rgba(0,0,0,0.4);
    ">

      <!-- Brand -->
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:28px;">
        <span style="
          width:8px;
          height:8px;
          border-radius:999px;
          background:#ef4444;
          box-shadow:0 0 10px rgba(239,68,68,0.7);
          display:inline-block;
        "></span>
        <span style="font-weight:600;font-size:16px;letter-spacing:-0.02em;">
          Avail
        </span>
      </div>

      <!-- Title -->
      <h1 style="
        font-size:22px;
        font-weight:600;
        margin:0 0 12px;
        color:#ffffff;
      ">
        Booking cancelled
      </h1>

      <p style="
        margin:0 0 20px;
        color:#9ca3af;
        font-size:15px;
        line-height:1.6;
      ">
        Hi ${guestName}, your meeting has been cancelled.
      </p>

      <!-- Card -->
      <div style="
        background:#0b1220;
        border:1px solid rgba(255,255,255,0.08);
        border-radius:12px;
        padding:20px;
        margin-bottom:24px;
      ">
        <p style="margin:0 0 10px;font-size:14px;color:#9ca3af;">
          <strong style="color:#e5e7eb;">With</strong><br/>
          ${hostName}
        </p>

        <p style="margin:0 0 10px;font-size:14px;color:#9ca3af;">
          <strong style="color:#e5e7eb;">Date</strong><br/>
          ${date}
        </p>

        <p style="margin:0;font-size:14px;color:#9ca3af;">
          <strong style="color:#e5e7eb;">Time</strong><br/>
          ${startTime} – ${endTime}
        </p>
      </div>

      <!-- Footer -->
      <p style="
        font-size:13px;
        color:#6b7280;
        line-height:1.6;
        margin:0;
      ">
        If you’d like, you can book another time that works for you.
        <br /><br />
        — Avail
      </p>

    </div>

    <p style="
      text-align:center;
      margin-top:18px;
      font-size:11px;
      color:#4b5563;
    ">
      © ${new Date().getFullYear()} Avail
    </p>
  </div>
`;
