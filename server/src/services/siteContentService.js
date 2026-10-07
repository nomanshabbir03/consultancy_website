import { getSupabase } from '../config/supabase.js';
import { unwrap } from '../utils/db.js';

const active = (table, columns) =>
  getSupabase().from(table).select(columns).eq('is_active', true).order('sort_order', { ascending: true });

export async function listFaqs() {
  return unwrap(await active('faqs', 'id, question, answer'));
}

export async function listTeamMembers() {
  const rows = unwrap(
    await active('team_members', 'id, name, role, bio, photo_url, facebook_url, instagram_url, linkedin_url')
  );
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    role: r.role,
    bio: r.bio,
    photo: r.photo_url,
    facebook: r.facebook_url,
    instagram: r.instagram_url,
    linkedin: r.linkedin_url,
  }));
}

export async function listSuccessStories() {
  const rows = unwrap(await active('success_stories', 'id, youtube_id, thumbnail_url'));
  return rows.map((r) => ({ id: r.id, youtubeId: r.youtube_id, thumbnail: r.thumbnail_url }));
}

/** Google reviews plus the aggregate rating badge. */
export async function getTestimonials() {
  const rows = unwrap(
    await active('testimonials', 'id, author_name, review, rating, avatar_url, avatar_initial, avatar_color')
  );
  const setting = unwrap(await getSupabase().from('site_settings').select('value').eq('key', 'google_rating').maybeSingle());
  return {
    rating: setting?.value ?? null,
    reviews: rows.map((r) => ({
      id: r.id,
      name: r.author_name,
      text: r.review,
      stars: r.rating,
      avatar: r.avatar_url,
      initial: r.avatar_initial,
      avatarBg: r.avatar_color,
    })),
  };
}
