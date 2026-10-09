import { useCallback } from 'react';
import { adminApi } from './adminApi';
import useAdminData from './useAdminData';

let cached;
/** The CMS content model (pages, sections, field definitions) from the API. Loaded once per session. */
export const loadCmsSchema = () => {
  cached ??= adminApi.cmsSchema().catch((err) => {
    cached = undefined;
    throw err;
  });
  return cached;
};

export const useCmsSchema = () => useAdminData(useCallback(loadCmsSchema, []));

export const STATUS = {
  default: { label: 'Built-in content', cls: '' },
  published: { label: 'Published', cls: 'is-ok' },
  changed: { label: 'Unpublished changes', cls: 'is-warn' },
};

export const GROUP_TITLES = {
  global: 'Global Content',
  site: 'Site pages',
  bpo: 'Services · BPO',
  healthcare: 'Services · Healthcare',
  'digital-marketing': 'Services · Digital Marketing',
};
export const GROUP_ORDER = ['global', 'site', 'bpo', 'healthcare', 'digital-marketing'];
