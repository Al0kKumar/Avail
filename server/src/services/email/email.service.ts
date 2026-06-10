// import nodemailer from 'nodemailer';

// import { env } from '../../config/env.js';

// export const mailer = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: env.EMAIL_FROM,
//     pass: env.EMAIL_PASSWORD,
//   },
// });

// type SendEmailArgs = {
//   to: string;
//   subject: string;
//   html: string;
// };

// export const sendEmail = async ({
//   to,
//   subject,
//   html,
// }: SendEmailArgs) => {
//   await mailer.sendMail({
//     from: `"Avail" <${env.EMAIL_FROM}>`,
//     to,
//     subject,
//     html,
//   });
// };






import nodemailer from 'nodemailer';
import { env } from '../../config/env.js';

export const mailer = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: env.EMAIL_FROM,
    pass: env.EMAIL_PASSWORD,
  },
  connectionTimeout: 10000,
});

mailer.verify((error, success) => {
  if (error) {
    console.error('SMTP VERIFY ERROR:', error);
  } else {
    console.log('SMTP READY');
  }
});

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
  console.log('Sending email to:', to);

  const result = await mailer.sendMail({
    from: `"Avail" <${env.EMAIL_FROM}>`,
    to,
    subject,
    html,
  });

  console.log('Email sent:', result.messageId);

  return result;
};