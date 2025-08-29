import { X } from 'lucide-react';
import React, { useState } from 'react';

import { formatCompactNumber } from '@/shared/lib/format/number';
import { BarChart } from '@/shared/ui/bar-chart/ui/BarChart';
import { NavLinkButton } from '@/shared/ui/nav-link-button/ui/NavLinkButton';
import { ProgressMeter } from '@/shared/ui/progress-meter/ui/ProgressMeter';
import { TrendTag } from '@/shared/ui/trend-tag/ui/TrendTag';

import './LiquidityBuffer.scss';

type BreakdownItem = {
  title: string;
  amount: number;
  sharePct?: number;
  trend?: { value: number; direction: 'up' | 'down' | 'none'; unit?: string };
};

type LiquidityBufferProps = {
  title?: string;
  progress: React.ComponentProps<typeof ProgressMeter>;
  trend?: React.ComponentProps<typeof TrendTag>;
  chart: React.ComponentProps<typeof BarChart>;
  chartRightLabel?: string;
  allPaymentsLink?: { label: string; to: string };
  sheet?: { title: string; items: BreakdownItem[] };
};

export const LiquidityBuffer: React.FC<LiquidityBufferProps> = ({
  title = 'Буфер ликвидности',
  progress,
  trend,
  chart,
  chartRightLabel,
  allPaymentsLink = { label: 'Все платежи', to: '/payments' },
  sheet,
}) => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="liquidity-buffer-wrap" aria-expanded={opened}>
      {/* сам виджет */}
      <div className="liquidity-buffer">
        <div className="lb-row">
          <div className="h2">{title}</div>
          {trend && <TrendTag {...trend} />}
        </div>

        <ProgressMeter {...progress} />

        <div className="lb-row">
          <div className="h3">Среднесуточный outflow</div>
          {chartRightLabel && <div className="h3">{chartRightLabel}</div>}
        </div>

        {/* кликабельная зона графика */}
        <div
          className="lb-chart-area"
          onClick={() => setOpened(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOpened(true)}
        >
          <BarChart {...chart} />
        </div>

        <div className="lb-nav">
          <NavLinkButton label={allPaymentsLink.label} to={allPaymentsLink.to} direction="right" />
        </div>
      </div>

      {sheet && (
        <div className={`lb-sheet ${opened ? 'is-open' : ''}`} aria-hidden={!opened}>
          <div className="lb-row">
            <div className="h3">{sheet.title}</div>
            <button className="lb-close" onClick={() => setOpened(false)} aria-label="Закрыть">
              <X size={20} />
            </button>
          </div>

          <div className="lb-breakdown">
            {sheet.items.map((it, i) => (
              <div key={i} className="lb-breakdown__row">
                <div className="body-regular">{it.title}</div>
                <div className="body-medium">{formatCompactNumber(it.amount)}</div>
                {typeof it.sharePct === 'number' && (
                  <div className="body-regular">{it.sharePct}%</div>
                )}
                {it.trend && (
                  <div
                    className={`body-regular
                      ${
                        it.trend.direction === 'up'
                          ? 'lb-trend-plus'
                          : it.trend.direction === 'down'
                            ? 'lb-trend-minus'
                            : 'body-regular'
                      }
                    `}
                  >
                    {it.trend.direction === 'up' ? '+' : it.trend.direction === 'down' ? '+' : ''}
                    {it.trend.value}
                    {it.trend.unit ?? '%'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
