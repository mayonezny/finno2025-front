import type { Column, SmartRow } from '@/shared/SmartTable';

import { fmtMoneyRu } from './smartTable.format';
import type { DsoRow } from './types';

export const dsoColumns: Column<DsoRow>[] = [
  { key: 'counterparty', header: 'Контрагент', width: '38%' },
  {
    key: 'b0_30',
    header: '0–30 дней, ₽',
    align: 'right',
    render: (r: DsoRow) => fmtMoneyRu(r.b0_30),
  },
  {
    key: 'b31_60',
    header: '31–60 дней, ₽',
    align: 'right',
    render: (r: DsoRow) => fmtMoneyRu(r.b31_60),
  },
  {
    key: 'b60p',
    header: '60+ дней, ₽',
    align: 'right',
    render: (r: DsoRow) => (
      <span style={{ color: r.b60p > 0 ? 'var(--color-contrast-red)' : 'inherit' }}>
        {fmtMoneyRu(r.b60p)}
      </span>
    ),
  },
];

export const dsoRows: SmartRow<DsoRow>[] = [
  { data: { counterparty: 'ООО "Заказчик 1"', b0_30: 450_000, b31_60: 120_000, b60p: 80_000 } },
  { data: { counterparty: 'АО "Клиент 2"', b0_30: 320_000, b31_60: 90_000, b60p: 0 } },
  { data: { counterparty: 'ИП Иванова', b0_30: 140_000, b31_60: 0, b60p: 0 } },
];
