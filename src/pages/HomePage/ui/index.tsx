import React from 'react';

import { formatCompactNumber } from '@/shared/lib/format/number';
import { TEST_MULTI_COLOR } from '@/shared/ui/bar-chart/fixtures/multi.example';
import { DetailCard, type DetailCardData } from '@/shared/ui/detail-card';
import { CashflowTreemap } from '@/widgets/cashflow-treemap';
import { LiquidityBuffer } from '@/widgets/liquidity-buffer/ui/LiquidityBuffer';
import { RepaymentChart } from '@/widgets/repayment-chart/ui/RepaymentChart';

const treemap_data = [
  { id: 'sber-1', title: 'Сбербанк', value: 4_200_000 },
  { id: 'sber-2', title: 'Сбербанк', value: 2_200_000 },
  { id: 'sber-3', title: 'Сбербанк', value: 800_000 },
  { id: 'sber-4', title: 'Сбербанк', value: 800_000 },
  { id: 'sber-5', title: 'Сбербанк', value: 200_000 },
  { id: 'sber-6', title: 'Сбербанк', value: 200_000 },
];

const weeklyBars = [
  { date: '12 июн.', values: [{ value: 34_000 }] },
  { date: '13 июн.', values: [{ value: 180_000 }] },
  { date: '14 июн.', values: [{ value: 67_000 }] },
  { date: '15 июн.', values: [{ value: 100_000 }] },
  { date: '16 июн.', values: [{ value: 56_000 }] },
  { date: '17 июн.', values: [{ value: 130_000 }] },
  { date: '18 июн.', values: [{ value: 103_000 }] },
];

export const HomePage: React.FC = () => (
  <div style={{ padding: 24, display: 'grid', gap: 32 }}>
    <RepaymentChart
      title="График погашения"
      WACD={8.5}
      chart={{
        data: TEST_MULTI_COLOR,
        colorMode: 'multi',
        showLabels: true,
        showValues: true,
        maxHeight: 160,
        segmentGap: 8,
        legend: [
          { label: 'Кредит', color: '#d90429' },
          { label: 'Облигации', color: '#ff8fb3' },
          { label: 'Лизинг', color: '#2f6df6' },
        ],
      }}
      buildDetail={({ date, segment }) => {
        const base: DetailCardData = {
          title: `${date} — ${segment.label ?? 'платёж'}`,
          amount: segment.value,
        };

        if (segment.label === 'Кредит') {
          base.details = 'Ставка: 8.9% (фикс)   Ковенанты: соблюдаются';
        } else if (segment.label === 'Облигации') {
          base.details = 'Купон: 10.2%   Дюрация: 1.7 года';
        } else if (segment.label === 'Лизинг') {
          base.details = 'Ставка: 7.8%   Остаток: 14.3M';
        }
        return base;
      }}
      defaultDetail={{
        title: `${TEST_MULTI_COLOR[0].date} — ближайший платёж`,
        amount: TEST_MULTI_COLOR[0].values[0].value + TEST_MULTI_COLOR[0].values[1].value,
        details: `${TEST_MULTI_COLOR[0].values[0].label}: ${formatCompactNumber(TEST_MULTI_COLOR[0].values[0].value)} + ${TEST_MULTI_COLOR[0].values[1].label}: ${formatCompactNumber(TEST_MULTI_COLOR[0].values[1].value)}`,
      }}
    />

    <CashflowTreemap
      title="Карта денежных потоков"
      HHI={0.29}
      data={treemap_data}
      onTileClick={(item) => console.log('tile clicked', item)}
    />

    <DetailCard
      defaultOpen
      data={{
        title: '12 января — ближайший платёж',
        amount: 2_400_000,
        details: 'Кредит 1.5M + Облигации 0.9M',
      }}
    />

    <LiquidityBuffer
      title="Буфер ликвидности"
      trend={{ value: -4, unit: 'дня', direction: 'down', showText: true }}
      progress={{
        value: 12,
        max: 60,
        unit: 'дней',
        criticalThreshold: 20,
        goal: 30,
      }}
      chart={{
        data: weeklyBars,
        showLabels: true,
        showValues: true,
        colorMode: 'single',
        baseColor: '#d70f2d',
        maxHeight: 120,
      }}
      chartRightLabel="420K"
      allPaymentsLink={{ label: 'Все платежи', to: '/payments' }}
      sheet={{
        title: 'Outflow за 7 дней — 2.41M',
        items: [
          {
            title: 'Налоги',
            amount: 850_000,
            sharePct: 35,
            trend: { value: 15, direction: 'up', unit: '%' },
          },
          {
            title: 'Зарплаты',
            amount: 720_000,
            sharePct: 30,
            trend: { value: 2, direction: 'up', unit: '%' },
          },
          {
            title: 'Проценты',
            amount: 480_000,
            sharePct: 20,
            trend: { value: 8, direction: 'up', unit: '%' },
          },
          {
            title: 'Прочее',
            amount: 120_000,
            sharePct: 5,
            trend: { value: 5, direction: 'down', unit: '%' },
          },
        ],
      }}
    />
  </div>
);
