import nodemailer from 'nodemailer';

import { env } from '../../config/env.js';

export const mailer = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.EMAIL_FROM,
    pass: env.EMAIL_PASSWORD,
  },
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
  await mailer.sendMail({
    from: `"Avail" <${env.EMAIL_FROM}>`,
    to,
    subject,
    html,
  });
};
