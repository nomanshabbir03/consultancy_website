import { getSupabase } from '../config/supabase.js';
import { unwrap } from '../utils/db.js';
import { validateBody } from '../utils/validation.js';

const SERVICES = ['BPO', 'Healthcare', 'Digital Marketing', 'Software Development'];

const CONTACT_RULES = {
  services: { oneOf: SERVICES },
  name: { required: true, min: 2, max: 120 },
  email: { required: true, email: true, max: 160 },
  number: { max: 40 },
  subject: { max: 200 },
  description: { required: true, min: 5, max: 3000 },
};

export async function submitInquiry(body) {
  const v = validateBody(body, CONTACT_RULES);
  unwrap(
    await getSupabase().from('contact_submissions').insert({
      service: v.services || null,
      name: v.name,
      email: v.email,
      phone: v.number || null,
      subject: v.subject || null,
      message: v.description,
    })
  );
  return { message: 'Thank you! Your message has been received and we will get back to you soon.' };
}
