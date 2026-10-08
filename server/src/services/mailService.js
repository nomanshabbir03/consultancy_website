import nodemailer from 'nodemailer';
import env from '../config/env.js';

let transport;

export const isMailConfigured = () => Boolean(env.mail.host && env.mail.user && env.mail.pass);

function getTransport() {
  transport ??= nodemailer.createTransport({
    host: env.mail.host,
    port: env.mail.port,
    secure: env.mail.port === 465,
    auth: { user: env.mail.user, pass: env.mail.pass },
  });
  return transport;
}

const esc = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/**
 * Emails a form submission to the company inbox (MAIL_TO). The submission is already stored in Supabase, so a mail problem
 * is logged and never fails the visitor's request. `fields` is an ordered list of [label, value] pairs.
 * Must be awaited: serverless functions are frozen as soon as the response is sent.
 */
export async function sendFormEmail({ subject, fields, replyTo, attachments }) {
  if (!isMailConfigured()) {
    console.warn('[mail] SMTP is not configured (SMTP_HOST, SMTP_USER, SMTP_PASS): notification skipped');
    return false;
  }
  try {
    const rows = fields.filter(([, value]) => value);
    await getTransport().sendMail({
      from: env.mail.from,
      to: env.mail.to,
      replyTo: replyTo || undefined,
      subject,
      text: rows.map(([label, value]) => `${label}: ${value}`).join('\n'),
      html: `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows
        .map(([label, value]) => `<tr><td style="font-weight:bold;vertical-align:top">${esc(label)}</td><td>${esc(value).replace(/\n/g, '<br>')}</td></tr>`)
        .join('')}</table>`,
      attachments,
    });
    return true;
  } catch (err) {
    console.error('[mail]', err.code || err.name, err.message);
    return false;
  }
}
