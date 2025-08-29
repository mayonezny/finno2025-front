import React from 'react';

import { CashflowTreemap } from '@/widgets/cashflow-treemap';
import { LiquidityBuffer } from '@/widgets/liquidity-buffer/ui/LiquidityBuffer';

const treemap_data = [
  { id: 'sber-1', title: 'Сбербанк', value: 4_200_000 },
  { id: 'sber-2', title: 'Сбербанк', value: 2_200_000 },
  { id: 'sber-3', title: 'Сбербанк', value: 800_000 },
  { id: 'sber-4', title: 'Сбербанк', value: 800_000 },
  { id: 'sber-5', title: 'Сбербанк', value: 200_000 },
  { id: 'sber-6', title: 'Сбербанк', value: 200_000 },
];

const weeklyBars = [
  { date: '12 июн.', values: [{ value: 120_000 }] },
  { date: '13 июн.', values: [{ value: 120_000 }] },
  { date: '14 июн.', values: [{ value: 120_000 }] },
  { date: '15 июн.', values: [{ value: 120_000 }] },
  { date: '16 июн.', values: [{ value: 120_000 }] },
  { date: '17 июн.', values: [{ value: 120_000 }] },
  { date: '18 июн.', values: [{ value: 120_000 }] },
];

export const HomePage: React.FC = () => (
  <div style={{ padding: 24, display: 'grid', gap: 32 }}>
    <CashflowTreemap
      title="Карта денежных потоков"
      HHI={0.29}
      data={treemap_data}
      onTileClick={(item) => console.log('tile clicked', item)}
    />

    <LiquidityBuffer
      title="Буфер ликвидности"
      trend={{ value: -4, unit: 'дня', direction: 'down', showText: true }}
      progress={{
        value: 18,
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
      periodLabel="За 7 дней"
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
