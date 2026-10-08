import { useCallback, useEffect, useState } from 'react';

/** Loads data from the admin API and exposes `reload`. */
export default function useAdminData(loader) {
  const [state, setState] = useState({ data: null, loading: true, error: '' });

  const load = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: '' }));
    return loader()
      .then((data) => setState({ data, loading: false, error: '' }))
      .catch((err) => setState({ data: null, loading: false, error: err.message }));
  }, [loader]);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, reload: load };
}
