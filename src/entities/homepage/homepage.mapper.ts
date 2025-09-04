import { formatCompactNumber } from '@/shared/lib/format/number';
import type { LiquidityBufferProps } from '@/widgets/liquidity-buffer/ui/LiquidityBuffer';

import type { Metric as KpiMetric } from '../../widgets/kpi-stats/model/types';
import type { TrendDirection, WeeklyReport } from '../jsonSkeleton/model/types';

const dir = (delta: number): TrendDirection => (delta > 0 ? 'up' : delta < 0 ? 'down' : 'none');

const round0 = (x: number) => Math.round(x);
const round1 = (x: number) => Math.round(x * 10) / 10;

export function mapWeeklyToKpis(weekly: WeeklyReport): KpiMetric[] {
  const s = weekly.report.summary;

  const metrics: KpiMetric[] = [
    // Денежка
    {
      title: 'Свободные деньги',
      value: s.free_cash.value,
      unit: '₽',
      colorRule: (v) => (v > 0 ? 'green' : 'red'),
      trend: {
        value: s.free_cash.change,
        unit: '₽',
        direction: dir(s.free_cash.change),
      },
    },

    {
      title: 'Невыбранные лимиты',
      value: s.undrawn_limits.value,
      unit: '₽',
      colorRule: (v) => (v > 0 ? 'blue' : 'red'),
      trend: {
        value: s.undrawn_limits.change,
        unit: '₽',
        direction: dir(s.undrawn_limits.change),
      },
    },

    // Ликвидность
    {
      title: 'Буфер ликвидности',
      value: round0(s.liquidity_buffer_days.value),
      unit: 'дн.',
      colorRule: (v) => (v >= 21 ? 'green' : v >= 14 ? 'blue' : 'red'),
      trend: {
        value: s.liquidity_buffer_days.change,
        unit: 'дн.',
        direction: dir(s.liquidity_buffer_days.change),
      },
    },

    // Долг
    {
      title: 'Чистый долг',
      value: s.net_debt.value,
      unit: '₽',
      colorRule: (v) => (v <= 0 ? 'green' : 'red'),
      trend: {
        value: s.net_debt.change,
        unit: '₽',
        direction: dir(-s.net_debt.change), // рост долга — плохо
      },
    },

    {
      title: 'CCC',
      value: round0(s.ccc_days.value),
      unit: 'дн.',
      colorRule: (v) => (v <= 30 ? 'green' : v <= 45 ? 'blue' : 'red'),
      trend: {
        value: s.ccc_days.change,
        unit: 'дн.',
        direction: dir(-s.ccc_days.change), // меньше — лучше
      },
    },
    {
      title: 'Покрытие долгов',
      value: round1(s.debt_service_coverage_ratio.value),
      unit: '×',
      colorRule: (v) => (v >= 2 ? 'green' : v >= 1.2 ? 'blue' : 'red'),
      trend: {
        value: round1(s.debt_service_coverage_ratio.change),
        unit: '×',
        direction: dir(s.debt_service_coverage_ratio.change),
      },
    },

    // Оборотный цикл
  ];

  return metrics;
}

export function mapWeeklyToLiqBuffer(weekly: WeeklyReport): LiquidityBufferProps {
  const s = weekly.report.summary;
  const o = weekly.report.cash_flow;
  const liqbuf: LiquidityBufferProps = {
    title: 'Буфер ликвидности',

    progress: {
      value: s.liquidity_buffer_days.value,
      max: 60,
      unit: 'дней',
      criticalThreshold: 20,
      goal: s.liquidity_buffer_days.value + 20,
      radius: 20,
    },
    chart: {
      data: [
        { date: '20 авг.', values: [{ value: 100_000 }] },
        { date: '21 авг.', values: [{ value: 80_000 }] },
        { date: '22 авг.', values: [{ value: 167_000 }] },
        { date: '23 авг.', values: [{ value: 100_000 }] },
        { date: '24 авг.', values: [{ value: 56_000 }] },
        { date: '25 авг.', values: [{ value: 130_000 }] },
        { date: '26 авг.', values: [{ value: 103_000 }] },
      ],
      showLabels: true,
      showValues: true,
      colorMode: 'single',
      baseColor: '#d70f2d',
      maxHeight: 120,
    },
    chartRightLabel: `${formatCompactNumber(s.avg_daily_outflow.value)}`,
    allPaymentsLink: { label: 'Все платежи', to: '/payments' },
    sheet: { title: `Outflow за 7 дней - 37.000.000`, items: o!.outflows },
  };
  return liqbuf;
}

export function mapWeeklyToWorkingCapital(weekly: WeeklyReport) {
  const s = weekly.report.summary;
  const dir = (delta: number): TrendDirection => (delta > 0 ? 'up' : delta < 0 ? 'down' : 'none');

  const CCCData = {
    dso: {
      value: s.dso_days.value,
      trendValue: s.dso_days.change,
      trendDirection: dir(s.dso_days.change),
    },
    dpo: {
      value: s.dpo_days.value,
      trendValue: s.dpo_days.change,
      trendDirection: dir(s.dpo_days.change),
    },
    dio: {
      value: s.dio_days.value,
      trendValue: s.dio_days.change,
      trendDirection: dir(s.dio_days.change),
    },
  };
  return CCCData;
}
