import type { Column, SmartRow } from '@/shared/SmartTable';

import { fmtMoneyRu } from './smartTable.format';
import type { DpoRow } from './types';

export const dpoColumns: Column<DpoRow>[] = [
  { key: 'counterparty', header: 'Контрагент', width: '38%' },
  {
    key: 'b0_30',
    header: '0–30 дней, ₽',
    align: 'right',
    render: (r: DpoRow) => fmtMoneyRu(r.b0_30),
  },
  {
    key: 'b31_60',
    header: '31–60 дней, ₽',
    align: 'right',
    render: (r: DpoRow) => fmtMoneyRu(r.b31_60),
  },
  { key: 'b60p', header: '60+ дней, ₽', align: 'right', render: (r: DpoRow) => fmtMoneyRu(r.b60p) },
];

export const dpoRows: SmartRow<DpoRow>[] = [
  { data: { counterparty: 'ООО "Поставщик 1"', b0_30: 280_000, b31_60: 150_000, b60p: 70_000 } },
  { data: { counterparty: 'АО "МеталИнвест"', b0_30: 420_000, b31_60: 90_000, b60p: 0 } },
  { data: { counterparty: 'ИП Кузнецов', b0_30: 0, b31_60: 60_000, b60p: 30_000 } },
];
