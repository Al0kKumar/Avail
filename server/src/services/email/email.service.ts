import { resend } from "./resend.js";

type SendEmailArgs = {
  to: string;
  subject: string;
  html: string;
};

export const sendEmail = async ({
  to,
  subject,
  html,
}: SendEmailArgs) => {
  const recipient =
    process.env.EMAIL_OVERRIDE || to;

  const result = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: recipient,
    subject,
    html,
  });

  if (result.error) {
    console.error('Resend error:', result.error);
  }

  return result;
};