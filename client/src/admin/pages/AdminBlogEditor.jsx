import { useCallback, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { adminApi } from '../adminApi';
import ImageUploader from '../components/ImageUploader';
import RichTextEditor from '../components/RichTextEditor';
import useAdminData from '../useAdminData';

const today = () => new Date().toISOString().slice(0, 10);
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 110);

const EMPTY = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  featuredImage: '',
  categoryId: '',
  authorId: '',
  publishedAt: today(),
  isPublished: true,
  metaDescription: '',
  relatedIds: [],
};

function Editor({ id, options, existing }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(() =>
    existing
      ? {
          title: existing.title,
          slug: existing.slug,
          excerpt: existing.excerpt || '',
          content: existing.content || '',
          featuredImage: existing.image || '',
          categoryId: existing.categoryId || '',
          authorId: existing.authorId || '',
          publishedAt: existing.publishedAt,
          isPublished: existing.isPublished,
          metaDescription: existing.metaDescription || '',
          relatedIds: existing.relatedIds || [],
        }
      : { ...EMPTY, categoryId: options.categories[0]?.id ?? '' }
  );
  const [slugTouched, setSlugTouched] = useState(Boolean(existing));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [relatedQuery, setRelatedQuery] = useState('');

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));
  const onTitle = (title) => set({ title, ...(slugTouched ? {} : { slug: slugify(title) }) });

  const relatedChoices = useMemo(() => {
    const term = relatedQuery.trim().toLowerCase();
    return options.posts.filter((p) => p.id !== id && (!term || p.title.toLowerCase().includes(term)));
  }, [options.posts, relatedQuery, id]);

  const toggleRelated = (postId) =>
    set({
      relatedIds: form.relatedIds.includes(postId)
        ? form.relatedIds.filter((x) => x !== postId)
        : form.relatedIds.length >= 6
          ? form.relatedIds
          : [...form.relatedIds, postId],
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = { ...form, authorId: form.authorId || null };
      if (id) await adminApi.updateBlog(id, payload);
      else await adminApi.createBlog(payload);
      navigate('/admin/blogs', { state: { notice: id ? 'Blog updated.' : 'Blog created.' } });
    } catch (err) {
      setError(err.message);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="adm-pagehead">
        <div>
          <h1>{id ? 'Edit Blog' : 'New Blog'}</h1>
          <p className="adm-sub">The article is shown on the public blog exactly as written here.</p>
        </div>
        <div className="adm-formbar">
          {id && form.isPublished && (
            <a href={`/blog/${form.slug}`} target="_blank" rel="noopener noreferrer" className="adm-btn is-ghost">
              View on site
            </a>
          )}
          <Link to="/admin/blogs" className="adm-btn is-ghost">
            Cancel
          </Link>
          <button type="submit" className="adm-btn" disabled={saving}>
            {saving ? 'Saving…' : id ? 'Save changes' : form.isPublished ? 'Publish' : 'Save draft'}
          </button>
        </div>
      </div>
      {error && (
        <div className="adm-alert is-error" role="alert">
          {error}
        </div>
      )}
      <div className="adm-form">
        <div className="adm-stack">
          <div className="adm-card adm-stack">
            <div className="adm-field">
              <label htmlFor="b-title">Title</label>
              <input id="b-title" required maxLength={200} value={form.title} onChange={(e) => onTitle(e.target.value)} />
            </div>
            <div className="adm-field">
              <label htmlFor="b-slug">Slug (web address)</label>
              <input
                id="b-slug"
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  set({ slug: slugify(e.target.value) });
                }}
              />
              <p className="adm-help">/blog/{form.slug || 'your-article'}</p>
            </div>
            <div className="adm-field">
              <label htmlFor="b-excerpt">Short excerpt</label>
              <textarea id="b-excerpt" maxLength={500} value={form.excerpt} onChange={(e) => set({ excerpt: e.target.value })} />
              <p className="adm-help">Shown on the blog card. Leave empty to use the start of the article.</p>
            </div>
            <div>
              <span className="adm-label">Content</span>
              <RichTextEditor key={id || 'new'} images value={form.content} onChange={(content) => set({ content })} placeholder="Write your article…" />
            </div>
          </div>
        </div>
        <div className="adm-stack">
          <div className="adm-card adm-stack">
            <div className="adm-field">
              <label htmlFor="b-status">Status</label>
              <select id="b-status" value={form.isPublished ? 'published' : 'draft'} onChange={(e) => set({ isPublished: e.target.value === 'published' })}>
                <option value="published">Published</option>
                <option value="draft">Draft (hidden from the website)</option>
              </select>
            </div>
            <div className="adm-field">
              <label htmlFor="b-date">Publication date</label>
              <input id="b-date" type="date" required value={form.publishedAt} onChange={(e) => set({ publishedAt: e.target.value })} />
            </div>
            <div className="adm-field">
              <label htmlFor="b-cat">Category</label>
              <select id="b-cat" required value={form.categoryId} onChange={(e) => set({ categoryId: e.target.value })}>
                {options.categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="adm-field">
              <label htmlFor="b-author">Author</label>
              <select id="b-author" value={form.authorId} onChange={(e) => set({ authorId: e.target.value })}>
                <option value="">No author</option>
                {options.authors.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="adm-card adm-stack">
            <span className="adm-label">Featured image</span>
            <ImageUploader value={form.featuredImage} onChange={(url) => set({ featuredImage: url })} />
          </div>
          <div className="adm-card adm-stack">
            <div>
              <span className="adm-label">Related articles</span>
              <p className="adm-help" style={{ marginBottom: 8 }}>
                Articles of the same category are suggested automatically. Pick up to 6 to show first.
                {!options.relatedSupported && ' (Hand-picking becomes available after the admin database migration is run.)'}
              </p>
              {options.relatedSupported && (
                <div className="adm-picker">
                  <input type="search" placeholder="Search articles…" aria-label="Search articles" value={relatedQuery} onChange={(e) => setRelatedQuery(e.target.value)} />
                  <ul>
                    {relatedChoices.map((p) => (
                      <li key={p.id}>
                        <label>
                          <input type="checkbox" checked={form.relatedIds.includes(p.id)} onChange={() => toggleRelated(p.id)} />
                          <span>{p.title}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {options.relatedSupported && <p className="adm-help">{form.relatedIds.length} selected</p>}
            </div>
            <div className="adm-field">
              <label htmlFor="b-meta">SEO description</label>
              <textarea id="b-meta" maxLength={300} value={form.metaDescription} onChange={(e) => set({ metaDescription: e.target.value })} />
              <p className="adm-help">Optional. Used by search engines; defaults to the excerpt.</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default function AdminBlogEditor() {
  const { id } = useParams();
  const loader = useCallback(async () => {
    const [options, existing] = await Promise.all([adminApi.blogOptions(), id ? adminApi.blog(id) : Promise.resolve(null)]);
    return { options, existing };
  }, [id]);
  const { data, loading, error } = useAdminData(loader);

  if (loading) return <p className="adm-sub">Loading…</p>;
  if (error) {
    return (
      <>
        <div className="adm-alert is-error">{error}</div>
        <Link to="/admin/blogs" className="adm-btn is-ghost">
          Back to blogs
        </Link>
      </>
    );
  }
  return <Editor key={id || 'new'} id={id} options={data.options} existing={data.existing} />;
}
