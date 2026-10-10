import nodemailer from 'nodemailer';

const json = (statusCode, payload) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload)
});

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Use POST to send a message.' });
  }

  let input;
  try {
    input = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'The form data could not be read.' });
  }

  const name = String(input.name || '').trim();
  const email = String(input.email || '').trim();
  const subject = String(input.subject || '').replace(/[\r\n]+/g, ' ').trim();
  const message = String(input.message || '').trim();

  if (input.website) return json(400, { error: 'The form submission was rejected.' });
  if (!name || name.length > 100 || !subject || subject.length > 180 || !message || message.length > 5000) {
    return json(400, { error: 'Please check the name, subject, and message lengths.' });
  }
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json(400, { error: 'Please enter a valid email address.' });
  }

  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return json(503, { error: 'Email sending is not configured yet. Please email Akash directly.' });
  }

  const port = Number(process.env.SMTP_PORT || 587);
  const secure = String(process.env.SMTP_SECURE || (port === 465)).toLowerCase() === 'true';
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure,
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || SMTP_USER,
      to: process.env.CONTACT_TO || 'rtakash2003@gmail.com',
      replyTo: { name, address: email },
      subject,
      text: `${message}\n\nFrom: ${name}\nReply to: ${email}`
    });
    return json(200, { ok: true });
  } catch (error) {
    console.error('Contact email delivery failed:', error?.message || error);
    return json(502, { error: 'Email delivery failed. Please email Akash directly.' });
  }
}
