/* eslint-disable arrow-body-style */
import { X } from 'lucide-react';
import React, { useLayoutEffect, useRef, useState } from 'react';

import { formatCompactNumber } from '@/shared/lib/format/number';
import { BarChart } from '@/shared/ui/bar-chart/ui/BarChart';
import { NavLinkButton } from '@/shared/ui/nav-link-button/ui/NavLinkButton';
import { ProgressMeter } from '@/shared/ui/progress-meter/ui/ProgressMeter';
import { TrendTag } from '@/shared/ui/trend-tag/ui/TrendTag';

import './LiquidityBuffer.scss';
import type { CashFlowEntry } from '@/entities/jsonSkeleton/model/types';

type BreakdownItem = {
  title: string;
  amount: number;
  sharePct?: number;
  trend?: { value: number; direction: 'up' | 'down' | 'none'; unit?: string };
};

export type LiquidityBufferProps = {
  title?: string;
  progress: React.ComponentProps<typeof ProgressMeter>;
  trend?: React.ComponentProps<typeof TrendTag>;
  chart: React.ComponentProps<typeof BarChart>;
  chartRightLabel?: string;
  allPaymentsLink?: { label: string; to: string };
  sheet?: { title: string; items: CashFlowEntry[]; total?: number | string };
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
  const [details, setDetails] = useState(false); // false = график, true = карточка
  const toggleDetails = () => setDetails((v) => !v);

  // --- анимация высоты контейнера ---
  const wrapRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // выставляем начальную высоту и обновляем при переключении/ресайзе
  useLayoutEffect(() => {
    const el = details ? cardRef.current : chartRef.current;
    const wrap = wrapRef.current;
    if (!el || !wrap) {
      return;
    }

    const setH = () => {
      // высота активной панели
      const h = el.offsetHeight;
      wrap.style.height = `${h}px`;
    };

    setH();

    // чтобы высота корректно подтягивалась при изменении содержимого
    const ro = new ResizeObserver(setH);
    ro.observe(el);
    return () => ro.disconnect();
  }, [details, chart.data, sheet?.items]); // можно расширить зависимости, если нужно

  return (
    <div className="liquidity-buffer" aria-expanded={details}>
      <div className="lb-row">
        <div className="h2">{title}</div>
        {trend && <TrendTag {...trend} />}
      </div>

      <ProgressMeter {...progress} />

      <div className="lb-row">
        <div className="h3">Среднесуточный outflow</div>
        {chartRightLabel && <div className="h3">{chartRightLabel}</div>}
      </div>

      {/* --- ПЕРЕКЛЮЧАТЕЛЬ --- */}
      <div
        className={`lb-toggle ${details ? 'is-details' : 'is-chart'}`}
        ref={wrapRef}
        aria-live="polite"
      >
        {/* слой с графиком */}
        <div
          ref={chartRef}
          className="lb-pane lb-pane--chart"
          aria-hidden={details}
          role="button"
          tabIndex={0}
          onClick={toggleDetails}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleDetails()}
        >
          <BarChart {...chart} />
        </div>

        {/* слой с карточкой */}
        <div
          ref={cardRef}
          className="lb-pane lb-pane--card"
          aria-hidden={!details}
          role="dialog"
          aria-labelledby="lb-sheet-title"
        >
          {sheet && (
            <div className="detail-card lb-sheet">
              <div className="detail-card__header">
                <div className="h3" id="lb-sheet-title">
                  {sheet.title}
                  {typeof sheet.total !== 'undefined' && (
                    <>
                      {' '}
                      —{' '}
                      {typeof sheet.total === 'number'
                        ? formatCompactNumber(sheet.total)
                        : sheet.total}
                    </>
                  )}
                </div>
                <button
                  className="detail-card__close"
                  onClick={toggleDetails}
                  aria-label="Скрыть детали"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="lb-breakdown">
                {sheet.items.map((it, i) => {
                  // const sign =
                  //   it.trend?.direction === 'up' ? '+' : it.trend?.direction === 'down' ? '−' : '';
                  return (
                    <div key={i} className="lb-breakdown__row">
                      <div className="body-regular">{it.use}</div>
                      <div className="body-medium">{formatCompactNumber(it.amount)}</div>
                      {/* {it.trend && (
                        <div
                          className={`body-regular ${
                            it.trend.direction === 'up'
                              ? 'lb-trend-plus'
                              : it.trend.direction === 'down'
                                ? 'lb-trend-minus'
                                : ''
                          }`}
                        >
                          {sign}
                          {it.trend.value}
                          {it.trend.unit ?? '%'}
                        </div>
                      )} */}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="lb-nav">
        <NavLinkButton label={allPaymentsLink.label} to={allPaymentsLink.to} direction="right" />
      </div>
    </div>
  );
};
