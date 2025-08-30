import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

import { KpiCard } from '@/shared/ui/kpi-card/ui/KpiCard';

import type { KpiStatsProps } from '../model/types';
import './KpiStats.scss';

export const KpiStats: React.FC<KpiStatsProps> = ({
  title,
  metrics,
  layout = 'horizontal',
  bordered = false,
  background,
  padding = '0',
  fractionDigits = 3,
  collapsible = false,
}) => {
  const canCollapse = layout === 'vertical' && collapsible;
  const [collapsed, setCollapsed] = useState(true);

  const toggle = () => canCollapse && setCollapsed((v) => !v);

  return (
    <div
      className={[
        'kpi-stats',
        `kpi-stats__${layout}`,
        canCollapse ? 'is-collapsible' : '',
        canCollapse && collapsed ? 'is-collapsed' : '',
      ].join(' ')}
    >
      {(title || canCollapse) && (
        <div className="kpi-stats__header">
          {title && <div className="h2">{title}</div>}
          {canCollapse && (
            <button
              type="button"
              className="kpi-stats__toggle"
              onClick={toggle}
              aria-expanded={!collapsed}
            >
              {collapsed ? 'Развернуть' : 'Свернуть'}
              <ChevronDown className="chev" aria-hidden="true" />
            </button>
          )}
        </div>
      )}

      <div className="kpi-stats__body" hidden={canCollapse && collapsed}>
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
    </div>
  );
};
