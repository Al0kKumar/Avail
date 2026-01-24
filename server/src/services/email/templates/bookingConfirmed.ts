export const bookingConfirmedEmail = ({
  guestName,
  hostName,
  date,
  startTime,
  endTime,
}: any) => `
  <div style="font-family: Arial, sans-serif">
    <h2>Booking confirmed 🎉</h2>
    <p>Hi ${guestName},</p>
    <p>Your meeting with <b>${hostName}</b> is confirmed.</p>

    <p>
      <b>Date:</b> ${date}<br />
      <b>Time:</b> ${startTime} – ${endTime}
    </p>

    <p>See you soon,<br/>Avail</p>
  </div>
`;
