import React from 'react';

import { BarChart } from '@/shared/ui/bar-chart';
import { TEST_EMPTY } from '@/shared/ui/bar-chart/fixtures/empty.example';
import { TEST_MULTI_COLOR } from '@/shared/ui/bar-chart/fixtures/multi.example';
import { TEST_SINGLE_COLOR } from '@/shared/ui/bar-chart/fixtures/single.example';
import { TEST_ZEROES } from '@/shared/ui/bar-chart/fixtures/zeroes.example';
import { ProgressMeter } from '@/shared/ui/progress-meter';
import { CashflowTreemap } from '@/widgets/cashflow-treemap';

const treemap_data = [
  { id: 'sber-1', title: 'Сбербанк', value: 4_200_000 },
  { id: 'sber-2', title: 'Сбербанк', value: 2_200_000 },
  { id: 'sber-3', title: 'Сбербанк', value: 800_000 },
  { id: 'sber-4', title: 'Сбербанк', value: 800_000 },
  { id: 'sber-5', title: 'Сбербанк', value: 200_000 },
  { id: 'sber-6', title: 'Сбербанк', value: 200_000 },
];

export const HomePage: React.FC = () => (
  <div style={{ padding: 24, display: 'grid', gap: 32 }}>
    <CashflowTreemap
      title="Карта денежных потоков"
      HHI={0.29}
      data={treemap_data}
      onTileClick={(item) => {
        console.log('tile clicked', item);
      }}
    />

    <ProgressMeter value={31} max={60} goal={30} criticalThreshold={20} unit="дней" />
  </div>
);
