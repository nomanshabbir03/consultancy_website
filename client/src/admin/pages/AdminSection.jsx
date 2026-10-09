import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { adminApi } from '../adminApi';
import { STATUS, useCmsSchema } from '../cmsSchema';
import ConfirmDialog from '../components/ConfirmDialog';
import SchemaForm, { decorate } from '../components/SchemaForm';
import useAdminData from '../useAdminData';

/** Drops the client-only `_k` keys so content can be compared with what the server holds. */
const strip = (value) => JSON.stringify(value, (key, v) => (key === '_k' ? undefined : v));

function SerpPreview({ content, fallback, path }) {
  const title = content.seoTitle || fallback?.title || '';
  const description = content.metaDescription || fallback?.description || '';
  return (
    <div className="adm-card adm-serp" aria-label="Search result preview">
      <p className="adm-help" style={{ marginBottom: 8 }}>How this page may look in search results (empty fields use the built-in text):</p>
      <p className="adm-serp-url">{(content.canonicalUrl || `https://your-domain.com${path === '/' ? '' : path}`).replace(/^https?:\/\//, '')}</p>
      <p className="adm-serp-title">{title.slice(0, 70)}{title.length > 70 && '…'}</p>
      <p className="adm-serp-desc">{description.slice(0, 160)}{description.length > 160 && '…'}</p>
      <p className="adm-help">
        Title {title.length}/60 · Description {description.length}/160 characters
        {content.robots === 'noindex' && ' · This page is hidden from search engines and the sitemap.'}
      </p>
    </div>
  );
}

/** Move up / down and show / hide for the blocks of a page (the first block is locked in place). */
function LayoutEditor({ page, value, onChange, errors }) {
  const items = value.items ?? [];
  const info = (key) => page.blocks.find((b) => b.key === key) ?? { title: key };
  const move = (i, d) => {
    const next = [...items];
    const j = i + d;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange({ items: next });
  };
  return (
    <div className="adm-list">
      {errors.items && <p className="adm-fielderr" role="alert">{errors.items}</p>}
      {items.map((item, i) => {
        const block = info(item.key);
        const editable = page.sections.some((s) => s.key === item.key && s.kind === 'content');
        return (
          <div key={item.key} className="adm-listitem" style={{ padding: '10px 12px', display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <span className="adm-listtitle" style={{ opacity: item.visible ? 1 : 0.5 }}>
              {block.title}
              {block.note && <span className="adm-help"> - {block.note}</span>}
            </span>
            <label className="adm-check" style={{ fontWeight: 400 }}>
              <input type="checkbox" checked={item.visible} disabled={block.locked} onChange={(e) => onChange({ items: items.map((x, j) => (j === i ? { ...x, visible: e.target.checked } : x)) })} /> Visible
            </label>
            {editable && (
              <Link to={`/admin/content/${page.slug}/${item.key}`} className="adm-btn is-ghost is-small">
                Edit content
              </Link>
            )}
            <span className="adm-listactions">
              <button type="button" className="adm-iconbtn-sm" aria-label="Move up" disabled={block.locked || i <= 1} onClick={() => move(i, -1)}>
                <i className="fa-solid fa-arrow-up" aria-hidden="true" />
              </button>
              <button type="button" className="adm-iconbtn-sm" aria-label="Move down" disabled={block.locked || i === items.length - 1} onClick={() => move(i, 1)}>
                <i className="fa-solid fa-arrow-down" aria-hidden="true" />
              </button>
            </span>
          </div>
        );
      })}
    </div>
  );
}

function Editor({ page, section, initial }) {
  const fields = useMemo(() => {
    if (section.kind !== 'seo' || !page.seoFallback) return section.fields;
    return section.fields.map((f) =>
      f.key === 'seoTitle' ? { ...f, placeholder: page.seoFallback.title } : f.key === 'metaDescription' ? { ...f, placeholder: page.seoFallback.description } : f
    );
  }, [section, page]);

  const [content, setContent] = useState(() => decorate(section.fields, initial.content));
  const [saved, setSaved] = useState(() => strip(decorate(section.fields, initial.content)));
  const [meta, setMeta] = useState(initial);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState('');
  const [notice, setNotice] = useState('');
  const [failure, setFailure] = useState('');
  const [confirm, setConfirm] = useState('');

  const dirty = strip(content) !== saved;

  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const apply = (result) => {
    const next = decorate(section.fields, result.content);
    setContent(next);
    setSaved(strip(next));
    setMeta(result);
  };

  const run = async (name, action, done) => {
    setBusy(name);
    setFailure('');
    setNotice('');
    try {
      const result = await action();
      setErrors({});
      if (result) apply(result);
      if (done) setNotice(done);
      return result;
    } catch (err) {
      setErrors(err.details ?? {});
      setFailure(err.message);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return null;
    } finally {
      setBusy('');
    }
  };

  const save = () => run('save', () => adminApi.saveSection(page.slug, section.key, content), 'Draft saved. Visitors still see the published version.');
  const publish = async () => {
    setConfirm('');
    await run(
      'publish',
      async () => {
        if (dirty) await adminApi.saveSection(page.slug, section.key, content);
        return adminApi.publishSection(page.slug, section.key);
      },
      'Published. The change is now live.'
    );
  };
  const discard = async () => {
    setConfirm('');
    await run('discard', () => adminApi.discardSection(page.slug, section.key), 'Draft discarded. Restored the last published version.');
  };
  const preview = async () => {
    const tab = window.open('', '_blank');
    const result = dirty
      ? await run('save', () => adminApi.saveSection(page.slug, section.key, content))
      : meta;
    if (!result) return tab?.close();
    if (tab) tab.location.href = `${section.previewPath || '/'}?cms_preview=1`;
    setNotice('Draft saved. The preview opened in a new tab (only visible to you while signed in).');
    return undefined;
  };

  const status = dirty ? 'changed' : meta.status;
  const statusInfo = STATUS[status] ?? STATUS.default;
  const canDiscard = meta.status === 'changed' || dirty;
  const canPublish = status === 'changed';

  return (
    <>
      <div className="adm-pagehead">
        <div>
          <p className="adm-sub"><Link to="/admin/content">Website Content</Link> / <Link to={`/admin/content/${page.slug}`}>{page.title}</Link></p>
          <h1>{section.title}</h1>
          <p className="adm-sub">{section.description}</p>
        </div>
        <span className={`adm-badge ${statusInfo.cls}`}>{dirty ? 'Unsaved edits' : statusInfo.label}</span>
      </div>

      <div className="adm-stickybar">
        <button type="button" className="adm-btn is-ghost" disabled={Boolean(busy) || !dirty} onClick={save}>
          {busy === 'save' ? 'Saving…' : 'Save draft'}
        </button>
        <button type="button" className="adm-btn is-ghost" disabled={Boolean(busy)} onClick={preview}>
          Preview
        </button>
        <button type="button" className="adm-btn" disabled={Boolean(busy) || !canPublish} onClick={() => setConfirm('publish')}>
          {busy === 'publish' ? 'Publishing…' : 'Publish'}
        </button>
        <button type="button" className="adm-btn is-ghost" disabled={Boolean(busy) || !canDiscard} onClick={() => setConfirm('discard')}>
          Discard changes
        </button>
        <span className="adm-sub" style={{ marginLeft: 'auto' }}>
          {meta.publishedAt ? `Last published ${new Date(meta.publishedAt).toLocaleString()}` : 'Not published yet - the site uses the built-in content'}
        </span>
      </div>

      {notice && <div className="adm-alert is-ok" role="status">{notice}</div>}
      {failure && <div className="adm-alert is-error" role="alert">{failure}</div>}

      {section.kind === 'seo' && <SerpPreview content={content} fallback={page.seoFallback} path={page.path} />}

      <div className="adm-card" style={{ marginTop: 18 }}>
        {section.toggle && (
          <div className="adm-field" style={{ marginBottom: 18 }}>
            <label className="adm-check">
              <input type="checkbox" checked={content._enabled !== false} onChange={(e) => setContent((c) => ({ ...c, _enabled: e.target.checked }))} /> Show this section on the website
            </label>
          </div>
        )}
        {section.kind === 'layout' ? (
          <LayoutEditor page={page} value={content} errors={errors} onChange={(patch) => setContent((c) => ({ ...c, ...patch }))} />
        ) : (
          <SchemaForm fields={fields} value={content} errors={errors} onChange={(patch) => setContent((c) => ({ ...c, ...patch }))} />
        )}
      </div>

      <ConfirmDialog
        open={confirm === 'publish'}
        title="Publish these changes?"
        message="They will go live on the public website immediately."
        confirmLabel="Publish"
        busy={Boolean(busy)}
        onConfirm={publish}
        onCancel={() => setConfirm('')}
      />
      <ConfirmDialog
        open={confirm === 'discard'}
        title="Discard your changes?"
        message="Your draft will be replaced by the last published version. This cannot be undone."
        confirmLabel="Discard"
        busy={Boolean(busy)}
        onConfirm={discard}
        onCancel={() => setConfirm('')}
      />
    </>
  );
}

export default function AdminSection() {
  const { page: slug, key } = useParams();
  const schema = useCmsSchema();
  const loader = useCallback(() => adminApi.cmsSection(slug, key), [slug, key]);
  const section = useAdminData(loader);
  const page = schema.data?.pages.find((p) => p.slug === slug);
  const def = page?.sections.find((s) => s.key === key);

  if (schema.loading || section.loading) return <p className="adm-sub">Loading…</p>;
  if (!page || !def || section.error) {
    return (
      <>
        <div className="adm-alert is-error">{section.error || schema.error || 'Section not found.'}</div>
        <Link to="/admin/content" className="adm-btn is-ghost">Back to Website Content</Link>
      </>
    );
  }
  return <Editor key={`${slug}/${key}`} page={page} section={def} initial={section.data} />;
}
