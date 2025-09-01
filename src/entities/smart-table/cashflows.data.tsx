import type { Column, SmartRow } from '@/shared/SmartTable';

import { fmtMoneyRu, fmtPct } from './smartTable.format';
import type { CashAccountRow } from './types';

export const cashColumns: Column<CashAccountRow>[] = [
  { key: 'bank', header: 'Банк', width: '28%' },
  { key: 'account', header: '№ счёта', width: '32%' },
  {
    key: 'balance',
    header: 'Остаток, ₽',
    align: 'right',
    render: (r: CashAccountRow) => fmtMoneyRu(r.balance),
  },
  {
    key: 'sharePct',
    header: 'Процент от суммы',
    align: 'right',
    render: (r: CashAccountRow) => fmtPct(r.sharePct),
  },
];

const raw: CashAccountRow[] = [
  { bank: 'Сбербанк', account: '40817810001234', balance: 1_200_000, sharePct: 24 },
  { bank: 'Сбербанк', account: '40817810005678', balance: 900_000, sharePct: 18 },
  { bank: 'Тинькофф', account: '40817810990001', balance: 700_000, sharePct: 14 },
  { bank: 'Тинькофф', account: '40817810990002', balance: 350_000, sharePct: 7 },
  { bank: 'ВТБ', account: '40817810007777', balance: 1_050_000, sharePct: 21 },
  { bank: 'Альфа-Банк', account: '40817810004567', balance: 800_000, sharePct: 16 },
];

export const cashRows: SmartRow<CashAccountRow>[] = (() => {
  const rows: SmartRow<CashAccountRow>[] = [];
  let i = 0;
  while (i < raw.length) {
    const bank = raw[i].bank;
    const chunk = raw.slice(i).filter((r) => r.bank === bank);
    chunk.forEach((r, idx) => {
      rows.push({
        data: r,
        spans: idx === 0 ? { bank: { rowSpan: chunk.length } } : undefined,
      });
    });
    i += chunk.length;
  }
  return rows;
})();
