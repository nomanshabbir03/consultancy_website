import * as contactService from '../services/contactService.js';

const HONEYPOT_MESSAGE = 'Thank you! Your message has been received and we will get back to you soon.';

export async function createInquiry(req, res) {
  if (req.body?.company_website) return res.status(201).json({ success: true, message: HONEYPOT_MESSAGE }); // bot filled the hidden field
  const result = await contactService.submitInquiry(req.body);
  res.status(201).json({ success: true, ...result });
}
