import nodemailer from 'nodemailer';

const host = process.env.SMTP_HOST || 'sandbox.smtp.mailtrap.io';
const port = Number(process.env.SMTP_PORT || '2525');
const user = process.env.SMTP_USER || '';
const pass = process.env.SMTP_PASS || '';
const from = process.env.EMAIL_FROM || 'Portofolio <no-reply@example.com>';

export function getTransport() {
  if (!host || !user || !pass) {
    throw new Error('SMTP belum lengkap. Pastikan SMTP_HOST, SMTP_USER, SMTP_PASS terisi.');
  }
  return nodemailer.createTransport({
    host,
    port,
    auth: {user, pass}
  });
}

export async function sendContactMail(params: {name: string; email: string; message: string}) {
  const transport = getTransport();
  // Penerima harus alamat email valid; JANGAN gunakan SMTP_USER (itu username, bukan email)
  const to = process.env.CONTACT_TO || 'inbox@example.com';
  await transport.sendMail({
    from,
    to,
    subject: `Kontak Portofolio: ${params.name}`,
    replyTo: params.email,
    text: params.message
  });
}


