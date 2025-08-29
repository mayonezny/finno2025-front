import { useState } from 'react';

import type { DetailCardData } from '../model/types';

export function useDetailCard(initial?: DetailCardData) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<DetailCardData | null>(initial ?? null);

  const show = (next: DetailCardData) => {
    setData(next);
    setOpen(true);
  };
  const hide = () => setOpen(false);

  return { open, data, show, hide, setData, setOpen };
}
