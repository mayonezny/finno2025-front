import React from 'react';

import { BarChart } from '@/shared/ui/bar-chart';
import { TEST_EMPTY } from '@/shared/ui/bar-chart/fixtures/empty.example';
import { TEST_MULTI_COLOR } from '@/shared/ui/bar-chart/fixtures/multi.example';
import { TEST_SINGLE_COLOR } from '@/shared/ui/bar-chart/fixtures/single.example';
import { TEST_ZEROES } from '@/shared/ui/bar-chart/fixtures/zeroes.example';
import { TextBubble } from '@/shared/ui/text-bubble';
import { CashflowTreemap } from '@/widgets/cashflow-treemap';
import { ChatWidget } from '@/widgets/ChatWidget';

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
    {/* Виджет: Карта денежных потоков */}
    <CashflowTreemap
      title="Карта денежных потоков"
      infoCardType="negative"
      infoCardText="HHI: 0.35"
      data={treemap_data}
      onTileClick={(item) => {
        console.log('tile clicked', item);
      }}
    />

    {/* Демки BarChart */}
    <section style={{ display: 'grid', gap: 24 }}>
      <h2 style={{ margin: 0 }}>BarChart – демо</h2>

      {/* Single color */}
      <div>
        <h3 style={{ margin: '0 0 12px' }}>Single color (оттенок по высоте)</h3>
        <BarChart
          data={TEST_SINGLE_COLOR}
          colorMode="single"
          baseColor="#e20714"
          showLabels
          showValues
          maxHeight={220}
          barWidth={48}
        />
      </div>

      {/* Multi color */}
      <div>
        <h3 style={{ margin: '0 0 12px' }}>Multi color (с легендой)</h3>
        <BarChart
          data={TEST_MULTI_COLOR}
          colorMode="multi"
          showLabels
          showValues
          maxHeight={260}
          barWidth={52}
          legend={[
            { label: 'Кредит', color: '#d90429' },
            { label: 'Облигации', color: '#ff8fb3' },
            { label: 'Лизинг', color: '#2f6df6' },
          ]}
        />
      </div>

      {/* Пустые данные */}
      <div>
        <h3 style={{ margin: '0 0 12px' }}>Пустые данные</h3>
        <BarChart
          data={TEST_EMPTY}
          colorMode="single"
          baseColor="#d90429"
          showLabels
          showValues
          maxHeight={220}
          barWidth={48}
        />
      </div>

      {/* Нули */}
      <div>
        <h3 style={{ margin: '0 0 12px' }}>Нули (edge-case)</h3>
        <BarChart
          data={TEST_ZEROES}
          colorMode="single"
          baseColor="#d90429"
          showLabels
          showValues
          maxHeight={220}
          barWidth={48}
        />
      </div>
    </section>
    <ChatWidget />
  </div>
);
