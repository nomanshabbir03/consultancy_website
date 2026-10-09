/**
 * Repeatable content that already has its own table and public endpoint (FAQs, team, testimonials, success stories).
 * Each entry maps API field names to table columns and describes the admin form; validation uses the same engine as
 * the CMS sections. `visible` is the existing is_active flag - new items start hidden until an admin ticks it.
 */
export const COLLECTIONS = {
  faqs: {
    table: 'faqs',
    title: 'FAQs',
    singular: 'FAQ',
    description: 'The "Common Questions" accordion on the home page.',
    titleField: 'question',
    fields: [
      { key: 'question', type: 'text', label: 'Question', required: true, max: 300, column: 'question' },
      { key: 'answer', type: 'textarea', label: 'Answer', required: true, max: 3000, column: 'answer' },
    ],
  },
  team: {
    table: 'team_members',
    title: 'Team / Leadership',
    singular: 'team member',
    description: 'The "Meet Our Leadership" cards on the home page.',
    titleField: 'name',
    subtitleField: 'role',
    imageField: 'photo',
    fields: [
      { key: 'name', type: 'text', label: 'Name', required: true, max: 120, column: 'name' },
      { key: 'role', type: 'text', label: 'Role', required: true, max: 120, column: 'role' },
      { key: 'bio', type: 'textarea', label: 'Bio', required: true, max: 1500, column: 'bio' },
      { key: 'photo', type: 'image', label: 'Photo', column: 'photo_url' },
      { key: 'facebook', type: 'url', label: 'Facebook link', column: 'facebook_url', help: 'Optional. Networks left empty are not shown.' },
      { key: 'instagram', type: 'url', label: 'Instagram link', column: 'instagram_url' },
      { key: 'linkedin', type: 'url', label: 'LinkedIn link', column: 'linkedin_url' },
    ],
  },
  testimonials: {
    table: 'testimonials',
    title: 'Testimonials',
    singular: 'testimonial',
    description: 'Google reviews shown next to the contact form.',
    titleField: 'name',
    subtitleField: 'text',
    imageField: 'avatar',
    fields: [
      { key: 'name', type: 'text', label: 'Reviewer name', required: true, max: 120, column: 'author_name' },
      { key: 'text', type: 'textarea', label: 'Review', required: true, max: 1500, column: 'review' },
      {
        key: 'stars',
        type: 'select',
        label: 'Rating',
        options: [5, 4, 3, 2, 1].map((n) => ({ value: n, label: `${n} star${n > 1 ? 's' : ''}` })),
        numeric: true,
        column: 'rating',
      },
      { key: 'avatar', type: 'image', label: 'Photo', column: 'avatar_url', help: 'Optional. Without a photo the first letter of the name is shown.' },
      { key: 'initial', type: 'text', label: 'Initial (used when there is no photo)', max: 2, column: 'avatar_initial' },
    ],
  },
  'success-stories': {
    table: 'success_stories',
    title: 'Success Stories',
    singular: 'success story',
    description: 'The YouTube video grid on the home page.',
    titleField: 'youtubeId',
    imageField: 'thumbnail',
    fields: [
      { key: 'youtubeId', type: 'text', label: 'YouTube video ID', required: true, max: 11, column: 'youtube_id', pattern: /^[A-Za-z0-9_-]{11}$/, help: 'The 11 characters after v= in the YouTube address.' },
      { key: 'thumbnail', type: 'image', label: 'Thumbnail', column: 'thumbnail_url', help: 'Leave empty to use YouTube’s own thumbnail.' },
    ],
  },
};
