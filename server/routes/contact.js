import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

router.post('/', async (req, res) => {
  try {
    const { name = '', email = '', subject = '', message = '' } = req.body;
    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim()
    };

    if (!payload.name || !payload.email || !payload.subject || !payload.message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    if (!isEmail(payload.email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email.' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: Number(process.env.MAIL_PORT) === 465,
      auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS }
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: payload.email,
      subject: `Portfolio: ${payload.subject}`,
      text: `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`
    });

    res.status(201).json({ success: true, message: 'Message sent.' });
  } catch (error) {
    console.error('Contact submission failed:', error);
    res.status(500).json({ success: false, message: 'Unable to send message right now.' });
  }
});

export default router;
