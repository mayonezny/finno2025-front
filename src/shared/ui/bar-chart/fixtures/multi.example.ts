import type { BarDatum } from '../model/types';

export const TEST_MULTI_COLOR: BarDatum[] = [
  {
    date: '12.06',
    values: [
      { label: 'Кредит', value: 400_000, color: '#d90429' },
      { label: 'Лизинг', value: 200_000, color: '#2f6df6' },
    ],
  },
  {
    date: '12.07',
    values: [
      { label: 'Облигации', value: 800_000, color: '#ff8fb3' },
      { label: 'Лизинг', value: 1_200_000, color: '#2f6df6' },
    ],
  },
  {
    date: '12.08',
    values: [
      { label: 'Кредит', value: 600_000, color: '#d90429' },
      { label: 'Облигации', value: 2_600_000, color: '#ff8fb3' },
    ],
  },
  { date: '12.09', values: [{ label: 'Лизинг', value: 600_000, color: '#2f6df6' }] },
  {
    date: '12.10',
    values: [
      { label: 'Лизинг', value: 1_200_000, color: '#2f6df6' },
      { label: 'Лизинг', value: 600_000, color: '#2f6df6' },
    ],
  },
  { date: '12.11', values: [{ label: 'Лизинг', value: 4_500_000, color: '#2f6df6' }] },
  { date: '12.12', values: [{ label: 'Кредит', value: 600_000, color: '#d90429' }] },
];
