import type { Rub } from './types';

export const fmtMoneyShort = (v: Rub): string =>
  v >= 1_000_000
    ? `${(v / 1_000_000).toFixed(1).replace('.0', '')}M`
    : v >= 1_000
      ? `${Math.round(v / 1_000)} тысяч`
      : String(v);

export const fmtMoneyRu = (v: Rub): string => v.toLocaleString('ru-RU');

export const fmtPct = (p: number): string => `${p}%`;
