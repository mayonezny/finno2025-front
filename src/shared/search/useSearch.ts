import { useMemo, useState } from 'react';

export type SearchCfg<T> = {
  fields: (keyof T)[];
  normalizer?: (s: string) => string;
};

const defaultNorm = (s: string) => s.toLowerCase().normalize('NFKD').replace(/ё/g, 'е');

export function useSearch<T>(data: readonly T[], cfg: SearchCfg<T>) {
  const [q, setQ] = useState('');

  const norm = cfg.normalizer ?? defaultNorm;

  const searched = useMemo(() => {
    const query = norm(q.trim());
    if (!query) {
      return data.slice();
    }

    return data.filter((item) =>
      cfg.fields.some((f) => {
        const v = item[f];
        if (v === null) {
          return false;
        }
        return norm(String(v)).includes(query);
      }),
    );
  }, [data, q, cfg.fields, norm]);

  return { q, setQ, searched };
}
