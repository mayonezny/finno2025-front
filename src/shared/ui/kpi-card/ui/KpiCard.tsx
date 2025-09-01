import React from 'react';

import { formatCompactNumber } from '@/shared/lib/format/number';

import { TrendTag } from '../../trend-tag';
import type { Color, KpiCardProps } from '../model/types';
import './KpiCard.scss';

const defaultColorRule = (_: number): Color => 'blue';

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  subtitle,
  value,
  unit = '',
  fractionDigits = 3,
  colorRule = defaultColorRule,
  trendTag,
  bordered = false,
  background = '#fff',
  padding = '8px 12px',
  ...rest
}) => {
  const color: Color = colorRule?.(value) ?? 'blue';

  const formatted = `${formatCompactNumber(value, fractionDigits)}${unit ? ` ${unit}` : ''}`;

  return (
    <div
      className={`kpi-card ${bordered ? 'kpi-card--bordered' : ''}`}
      style={{ background, padding }}
      {...rest}
      role={rest.onClick ? 'button' : rest.role}
      tabIndex={rest.onClick ? 0 : rest.tabIndex}
      onKeyDown={(e) => {
        if (!rest.onClick) {
          return;
        }
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          (rest.onClick as unknown as () => void)();
        }
      }}
    >
      <div className="kpi-card__top">
        <div className="caption">{title}</div>
        {trendTag && <TrendTag {...trendTag} />}
      </div>

      {subtitle && <div className="grey-caption">{subtitle}</div>}

      <div className={`h1 kpi-card__value--${color}`}>{formatted}</div>
    </div>
  );
};
