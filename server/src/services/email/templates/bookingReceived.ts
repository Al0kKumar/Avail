export const bookingReceivedEmail = ({
  hostName,
  guestName,
  guestEmail,
  date,
  startTime,
  endTime,
}: {
  hostName: string;
  guestName: string;
  guestEmail: string;
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
          background:#22c55e;
          box-shadow:0 0 10px rgba(34,197,94,0.8);
          display:inline-block;
        "></span>
        <span style="font-weight:600;font-size:16px;">
          Avail
        </span>
      </div>

      <h1 style="
        font-size:22px;
        font-weight:600;
        margin:0 0 12px;
        color:#ffffff;
      ">
        New booking received
      </h1>

      <p style="
        margin:0 0 20px;
        color:#9ca3af;
        font-size:15px;
        line-height:1.6;
      ">
        Hi ${hostName}, you’ve received a new booking.
      </p>

      <div style="
        background:#0b1220;
        border:1px solid rgba(255,255,255,0.08);
        border-radius:12px;
        padding:20px;
        margin-bottom:24px;
      ">
        <p style="margin:0 0 10px;font-size:14px;color:#9ca3af;">
          <strong style="color:#e5e7eb;">Guest</strong><br/>
          ${guestName} (${guestEmail})
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

      <p style="
        font-size:13px;
        color:#6b7280;
        line-height:1.6;
        margin:0;
      ">
        You can manage this booking from your dashboard.
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
