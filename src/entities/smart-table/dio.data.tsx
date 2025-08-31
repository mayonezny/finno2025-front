import type { Column, SmartRow } from '@/shared/SmartTable';

import { fmtMoneyRu } from './smartTable.format';
import type { DioRow } from './types';

export const dioColumns: Column<DioRow>[] = [
  { key: 'group', header: 'Товарная группа', width: '40%' },
  {
    key: 'onStock',
    header: 'На складе, ₽',
    align: 'right',
    render: (r: DioRow) => fmtMoneyRu(r.onStock),
  },
  { key: 'days', header: 'Дни оборота', align: 'right', render: (r: DioRow) => String(r.days) },
];

export const dioRows: SmartRow<DioRow>[] = [
  { data: { group: 'Группа A', onStock: 1_200_000, days: 45 } },
  { data: { group: 'Группа B', onStock: 640_000, days: 38 } },
  { data: { group: 'Группа C', onStock: 210_000, days: 22 } },
];
