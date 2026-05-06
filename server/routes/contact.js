import express from 'express';
import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';

const router = express.Router();

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const sendMail = async (payload) => {
  const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS, MAIL_TO } = process.env;
  if (!MAIL_HOST || !MAIL_PORT || !MAIL_USER || !MAIL_PASS || !MAIL_TO) return;

  const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: Number(MAIL_PORT),
    secure: Number(MAIL_PORT) === 465,
    auth: { user: MAIL_USER, pass: MAIL_PASS }
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${MAIL_USER}>`,
    to: MAIL_TO,
    replyTo: payload.email,
    subject: `Portfolio: ${payload.subject}`,
    text: `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`
  });
};

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

    const contact = await Contact.create(payload);
    await sendMail(payload);

    res.status(201).json({ success: true, message: 'Message sent.', id: contact._id });
  } catch (error) {
    console.error('Contact submission failed:', error);
    res.status(500).json({ success: false, message: 'Unable to send message right now.' });
  }
});

export default router;
