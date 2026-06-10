
import { Router } from 'express';
import { resend } from '../../services/email/resend.js';

const router = Router();

router.get('/test-email', async (_, res) => {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'alok.mishraa.dev@gmail.com',
      subject: 'Avail Test Email',
      html: '<h1>Resend is working 🚀</h1>',
    });

    console.log(data);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error,
    });
  }
});

export default router;