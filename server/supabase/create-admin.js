// Creates (or promotes / resets) an admin user in Supabase Auth. Nothing is stored in the repository: the password is
// read from the ADMIN_PASSWORD environment variable for this one command only.
//
//   PowerShell:  $env:ADMIN_PASSWORD='a-long-unique-password'; node supabase/create-admin.js admin@example.com
//   bash:        ADMIN_PASSWORD='a-long-unique-password' node supabase/create-admin.js admin@example.com
//
// Admin rights live in app_metadata.role = "admin", which can only be written with the server secret key.
import { getSupabase } from '../src/config/supabase.js';

const email = (process.argv[2] || '').trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD || '';

if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  console.error('Usage: node supabase/create-admin.js <email>   (password via the ADMIN_PASSWORD environment variable)');
  process.exit(1);
}
if (password.length < 12) {
  console.error('ADMIN_PASSWORD must be set and at least 12 characters long.');
  process.exit(1);
}

const supabase = getSupabase();
const { data: list, error: listError } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
if (listError) throw listError;
const existing = list.users.find((u) => u.email?.toLowerCase() === email);

if (existing) {
  const { error } = await supabase.auth.admin.updateUserById(existing.id, {
    password,
    email_confirm: true,
    app_metadata: { ...existing.app_metadata, role: 'admin' },
  });
  if (error) throw error;
  console.log(`Updated existing user ${email}: admin role granted and password reset.`);
} else {
  const { error } = await supabase.auth.admin.createUser({ email, password, email_confirm: true, app_metadata: { role: 'admin' } });
  if (error) throw error;
  console.log(`Created admin user ${email}.`);
}
