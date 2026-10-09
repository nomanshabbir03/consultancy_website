import { useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { adminApi } from '../adminApi';
import { GROUP_ORDER, GROUP_TITLES, STATUS, useCmsSchema } from '../cmsSchema';
import useAdminData from '../useAdminData';

const worst = (sections) => (sections.some((s) => s.status === 'changed') ? 'changed' : sections.every((s) => s.status === 'default') ? 'default' : 'published');

function Badge({ status }) {
  const s = STATUS[status] ?? STATUS.default;
  return <span className={`adm-badge ${s.cls}`}>{s.label}</span>;
}

/** Website Content: every page and the global content, with its publishing status. */
export function AdminContentHub() {
  const schema = useCmsSchema();
  const overview = useAdminData(useCallback(adminApi.cmsOverview, []));
  const status = Object.fromEntries((overview.data ?? []).map((p) => [p.slug, worst(p.sections)]));
  const pages = schema.data?.pages ?? [];
  const groups = GROUP_ORDER.map((g) => [g, pages.filter((p) => p.group === g)]).filter(([, list]) => list.length);

  return (
    <>
      <div className="adm-pagehead">
        <div>
          <h1>Website Content</h1>
          <p className="adm-sub">Edit what the website says. Changes stay private until you publish them; design and layout are controlled by the site.</p>
        </div>
      </div>
      {(schema.error || overview.error) && <div className="adm-alert is-error" role="alert">{schema.error || overview.error}</div>}
      {(schema.loading || overview.loading) && <p className="adm-sub">Loading…</p>}
      {groups.map(([group, list]) => (
        <section key={group} style={{ marginBottom: 28 }}>
          <h2 className="adm-h2">{GROUP_TITLES[group]}</h2>
          <div className="adm-cardgrid">
            {list.map((page) => (
              <Link key={page.slug} to={`/admin/content/${page.slug}`} className="adm-card adm-pagecard">
                <strong>{page.title}</strong>
                <span className="adm-sub">{page.group === 'global' ? page.description : page.path}</span>
                {status[page.slug] && <Badge status={status[page.slug]} />}
              </Link>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

/** The sections of one page (or of Global Content), each with an Edit action. */
export function AdminContentPage() {
  const { page: slug } = useParams();
  const schema = useCmsSchema();
  const overview = useAdminData(useCallback(adminApi.cmsOverview, []));
  const page = schema.data?.pages.find((p) => p.slug === slug);
  const statuses = Object.fromEntries(((overview.data ?? []).find((p) => p.slug === slug)?.sections ?? []).map((s) => [s.key, s]));

  if (schema.loading) return <p className="adm-sub">Loading…</p>;
  if (!page) {
    return (
      <>
        <div className="adm-alert is-error">{schema.error || 'Page not found.'}</div>
        <Link to="/admin/content" className="adm-btn is-ghost">Back to Website Content</Link>
      </>
    );
  }
  return (
    <>
      <div className="adm-pagehead">
        <div>
          <h1>{page.title}</h1>
          <p className="adm-sub">{page.group === 'global' ? page.description : `Public address: ${page.path}`}</p>
        </div>
        <div className="adm-formbar">
          {page.path && (
            <a href={page.path} target="_blank" rel="noopener noreferrer" className="adm-btn is-ghost">
              Open public page
            </a>
          )}
          <Link to="/admin/content" className="adm-btn is-ghost">All pages</Link>
        </div>
      </div>
      {overview.error && <div className="adm-alert is-error" role="alert">{overview.error}</div>}
      <div className="adm-stack">
        {page.sections.map((section) => (
          <div key={section.key} className="adm-card adm-sectionrow">
            <div>
              <strong>{section.title}</strong>
              <p className="adm-sub">{section.description}</p>
            </div>
            <div className="adm-formbar">
              <Badge status={statuses[section.key]?.status ?? 'default'} />
              <Link to={`/admin/content/${page.slug}/${section.key}`} className="adm-btn is-small">
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
