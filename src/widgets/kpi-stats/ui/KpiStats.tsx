import React from 'react';

import { KpiCard } from '@/shared/ui/kpi-card/ui/KpiCard';

import type { KpiStatsProps } from '../model/types';
import './KpiStats.scss';

export const KpiStats: React.FC<KpiStatsProps> = ({
  metrics,
  layout = 'horizontal',
  bordered = false,
  background,
  padding = '0',
  fractionDigits = 3,
}) => (
  <div className={`kpi-stats kpi-stats__${layout}`}>
    {metrics.map((m, idx) => (
      <KpiCard
        key={idx}
        title={m.title}
        value={m.value}
        unit={m.unit}
        fractionDigits={fractionDigits}
        colorRule={m.colorRule ?? (() => 'blue')}
        trendTag={
          m.trend && {
            value: m.trend.value,
            unit: m.trend.unit ?? '',
            direction: m.trend.direction,
            showText: true,
          }
        }
        bordered={bordered}
        background={background}
        padding={padding}
      />
    ))}
  </div>
);
