import { resend } from './resend.js';

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

  console.log('EMAIL ATTEMPT');
  console.log('Original recipient:', to);
  console.log('Actual recipient:', recipient);
  console.log('Subject:', subject);

  const result = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: recipient,
    subject,
    html,
  });

  console.log('RESEND RESULT:', JSON.stringify(result));

  return result;
};