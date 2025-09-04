import type { BarDatum, LegendItem } from '@/shared/ui/bar-chart';
import type { DetailCardData } from '@/shared/ui/detail-card';
import type { TreemapItem } from '@/shared/ui/treemap';
import type { Metric as KpiMetric } from '@/widgets/kpi-stats';
import type { BreakdownItem } from '@/widgets/liquidity-buffer/model/types';

// ───────────────────────────────────────────────────────────────────────────────
// KPI
// ───────────────────────────────────────────────────────────────────────────────
export const KPI_METRICS: KpiMetric[] = [
  {
    title: 'Свободные деньги',
    value: 2_400_000,
    unit: '₽',
    colorRule: (v: number) => (v > 0 ? 'green' : 'red'),
    trend: { value: 15, unit: '%', direction: 'up' },
  },
  {
    title: 'Невыбранные лимиты',
    value: 5_200_000,
    unit: '₽',
    colorRule: () => 'blue',
    trend: { value: 0, unit: '%', direction: 'none' },
  },
  {
    title: 'Буфер ликвидности',
    value: 18,
    unit: 'дней',
    colorRule: (v: number) => (v > 0 ? 'green' : 'red'),
    trend: { value: 4, unit: 'д', direction: 'down' },
  },
  {
    title: 'Чистый долг',
    value: -1_200_000,
    unit: '₽',
    colorRule: (v: number) => (v > 0 ? 'red' : 'green'),
    trend: { value: 8, unit: '%', direction: 'down' },
  },
  {
    title: 'CCC',
    value: 45,
    unit: 'дней',
    colorRule: (v: number) => (v > 0 ? 'red' : 'green'),
    trend: { value: 12, unit: 'д', direction: 'up' },
  },
  {
    title: 'Покрытие долгов',
    value: 2.8,
    unit: '×',
    colorRule: (v: number) => (v > 0 ? 'green' : 'red'),
    trend: { value: 0.5, unit: 'x', direction: 'down' },
  },
];

// ───────────────────────────────────────────────────────────────────────────────
// Treemap (Карта денежных потоков)
// ───────────────────────────────────────────────────────────────────────────────
export const TREEMAP_TITLE = 'Свободные средства и лимиты';
export const TREEMAP_HHI = 0.29;
export const TREEMAP_DATA: TreemapItem[] = [
  { id: 'sber-1', title: 'Альфа-банк', value: 10_200_000 },
  { id: 'sber-2', title: 'Газпром-банк', value: 10_300_000 },
  { id: 'sber-3', title: 'Центр-инвест', value: 5_800_000 },
  { id: 'sber-4', title: 'ВТБ', value: 5_600_000 },
  { id: 'sber-5', title: 'Сбербанк', value: 200_000 },
  { id: 'sber-6', title: 'Сбербанк', value: 200_000 },
];

// ───────────────────────────────────────────────────────────────────────────────
// Liquidity Buffer
// ───────────────────────────────────────────────────────────────────────────────
export const LB_TITLE = 'Буфер ликвидности';
export const LB_TREND = { value: 4, unit: 'дня', direction: 'down', showText: true } as const;
export const LB_CHART_RIGHT_LABEL = '420K';
export const LB_CHART_DATA: BarDatum[] = [
  { date: '12 июн.', values: [{ value: 34_000 }] },
  { date: '13 июн.', values: [{ value: 180_000 }] },
  { date: '14 июн.', values: [{ value: 67_000 }] },
  { date: '15 июн.', values: [{ value: 100_000 }] },
  { date: '16 июн.', values: [{ value: 56_000 }] },
  { date: '17 июн.', values: [{ value: 130_000 }] },
  { date: '18 июн.', values: [{ value: 103_000 }] },
];
export const LB_PROGRESS = {
  value: 12,
  max: 60,
  unit: 'дней',
  criticalThreshold: 20,
  goal: 30,
  radius: 20,
} as const;
export const LB_SHEET_TITLE = 'Outflow за 7 дней — 2.41M';
// export const LB_SHEET_ITEMS: BreakdownItem[] = [
//   {
//     title: 'Налоги',
//     amount: 850_000,
//     sharePct: 35,
//     trend: { value: 15, direction: 'up', unit: '%' },
//   },
//   {
//     title: 'Зарплаты',
//     amount: 720_000,
//     sharePct: 30,
//     trend: { value: 2, direction: 'up', unit: '%' },
//   },
//   {
//     title: 'Проценты',
//     amount: 480_000,
//     sharePct: 20,
//     trend: { value: 8, direction: 'up', unit: '%' },
//   },
//   {
//     title: 'Прочее',
//     amount: 120_000,
//     sharePct: 5,
//     trend: { value: 5, direction: 'down', unit: '%' },
//   },
// ];

// ───────────────────────────────────────────────────────────────────────────────
// Repayment Chart — данные графика
// ───────────────────────────────────────────────────────────────────────────────
export type RepaymentSegment = { value: number; label?: string; color?: string };
export type RepaymentPoint = { date: string; values: RepaymentSegment[] };

export const REPAYMENT_LEGEND: LegendItem[] = [
  { label: 'Кредит', color: '#d90429' },
  { label: 'Облигации', color: '#ff8fb3' },
  { label: 'Лизинг', color: '#2f6df6' },
];

export const REPAYMENT_WACD = 8.5;

export const REPAYMENT_DATA: RepaymentPoint[] = [
  {
    date: '12.06',
    values: [
      { label: 'Кредит', value: 600_000, color: '#d90429' },
      { label: 'Лизинг', value: 200_000, color: '#2f6df6' },
    ],
  },
  {
    date: '12.07',
    values: [
      { label: 'Облигации', value: 2_000_000, color: '#ff8fb3' },
      { label: 'Лизинг', value: 1_100_000, color: '#2f6df6' },
    ],
  },
  {
    date: '12.08',
    values: [
      { label: 'Кредит', value: 1_200_000, color: '#d90429' },
      { label: 'Облигации', value: 2_000_000, color: '#ff8fb3' },
    ],
  },
  { date: '12.09', values: [{ label: 'Лизинг', value: 600_000, color: '#2f6df6' }] },
  { date: '12.10', values: [{ label: 'Лизинг', value: 1_800_000, color: '#2f6df6' }] },
  { date: '12.11', values: [{ label: 'Лизинг', value: 4_500_000, color: '#2f6df6' }] },
  { date: '12.12', values: [{ label: 'Кредит', value: 600_000, color: '#d90429' }] },
];

// ───────────────────────────────────────────────────────────────────────────────
// Repayment Chart — подробности
// ───────────────────────────────────────────────────────────────────────────────

export const REPAYMENT_DETAILS_BY_LABEL: Record<
  string,
  Omit<DetailCardData, 'title' | 'amount'>
> = {
  Кредит: { details: 'Ставка: 8.9% фикс · Амортизация: равными долями · Ковенанты: соблюдаются' },
  Облигации: { details: 'Купон: 10.2% · Погашение: bullet · Дюрация: 1.7 года' },
  Лизинг: { details: 'Ставка: 7.8% · Предмет: автопарк · Остаток: 14.3M' },
};

export const REPAYMENT_DETAILS_BY_POINT: Record<
  string, // date
  Record<string, Omit<DetailCardData, 'title' | 'amount'>>
> = {
  '12.06': {
    Кредит: { details: 'Ставка: 9.1% · Тело: 520K · Проценты: 80K · Ковенанты: ок' },
    Лизинг: { details: 'Ставка: 7.8% · Остаток: 14.3M' },
  },
  '12.07': {
    Облигации: { details: 'Купон: 10.0% · НКД: 46K · Серия: BO-01' },
    Лизинг: { details: 'Ставка: 7.6% · Предмет: 3 экскаватора · Остаток: 9.7M' },
  },
  '12.08': {
    Кредит: { details: 'Ставка: 8.7% · Комиссия: 0.3% · След. пересмотр: 01.03' },
    Облигации: { details: 'Купон: 10.5% · Оферта через 6 мес.' },
  },
  '12.09': {
    Лизинг: { details: 'Ставка: 7.9% · График: аннуитет · Остаток: 7.2M' },
  },
  '12.10': {
    Лизинг: { details: 'Ставка: 7.4% · Досрочно: нет · Предмет: 5 авто' },
  },
  '12.11': {
    Лизинг: { details: 'Ставка: 7.2% · Реструктурирован в 2024 · Остаток: 4.1M' },
  },
  '12.12': {
    Кредит: { details: 'Ставка: 9.0% · Погашение тела: 600K · Никаких штрафов' },
  },
};

// ───────────────────────────────────────────────────────────────────────────────
// Working Capital
// ───────────────────────────────────────────────────────────────────────────────
export const WORKING_CAPITAL_DATA = {
  dso: { value: 35, trendValue: 2, trendDirection: 'up' as const },
  dpo: { value: 25, trendValue: 1, trendDirection: 'down' as const },
  dio: { value: 40, trendValue: 0, trendDirection: 'none' as const },
};
