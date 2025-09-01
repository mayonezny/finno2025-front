import React from 'react';

import { formatCompactNumber } from '@/shared/lib/format/number';

import { withLightness } from '../lib/color';
import type { BarChartProps } from '../model/types';
import './BarChart.scss';

type CSSVars = React.CSSProperties & {
  ['--chartH']?: string;
};

export const BarChart: React.FC<BarChartProps> = ({
  data,
  showLabels = true,
  showValues = true,
  colorMode = 'single',
  baseColor = '#d90429',
  legend,
  maxHeight = 220,
  segmentGap = 4,
  onSegmentClick,
  sensivity = 1,
}) => {
  const safeData = Array.isArray(data) ? data : [];

  const totals = safeData.map((d) => (d.values ?? []).reduce<number>((a, v) => a + v.value, 0));
  const minTotal = Math.min(...totals, 0);
  const maxTotal = Math.max(...totals, 1);

  const norm = (t: number) => {
    const range = Math.max(1, maxTotal - minTotal);
    let base = (t - minTotal) / range;

    base = Math.pow(base, sensivity);

    const padded = 0.15 + base * 0.85;

    return Math.min(1, Math.max(0, padded));
  };

  const styleVars: CSSVars = {
    '--chartH': `${maxHeight}px`,
  };

  const handleSegmentClick = (
    barIndex: number,
    date: string,
    segment: { label?: string; value: number; color?: string },
    total: number,
  ) => {
    if (onSegmentClick) {
      onSegmentClick({ barIndex, date, segment, total });
    } else {
      // eslint-disable-next-line no-console
      console.log('segment clicked', { barIndex, date, segment, total });
    }
  };

  return (
    <div className="bar-chart" style={styleVars}>
      <div className="bars" role="list" aria-label="bar chart">
        {safeData.map((d, i) => {
          const values = Array.isArray(d.values) ? d.values : [];
          const total = values.reduce<number>((acc, v) => acc + v.value, 0);
          const barHeightPct = norm(total) * 100;
          const singleColor =
            colorMode === 'single'
              ? withLightness(baseColor, lerp(40, 92, norm(total)))
              : undefined;

          return (
            <div key={i} className="bar-wrapper" role="listitem">
              <div className="bar-container" aria-hidden="true">
                <div className="bar" style={{ height: `${barHeightPct}%`, gap: `${segmentGap}px` }}>
                  {values.map((v, j) => {
                    const partPct = total > 0 ? (v.value / total) * 100 : 0;
                    const bg = colorMode === 'multi' ? (v.color ?? baseColor) : singleColor!;
                    return (
                      <div
                        key={j}
                        className="bar-segment"
                        style={{ height: `${partPct}%`, background: bg }}
                        title={`${v.label ?? ''} ${formatCompactNumber(v.value)}`}
                        role="button"
                        tabIndex={0}
                        onClick={() => handleSegmentClick(i, d.date, v, total)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleSegmentClick(i, d.date, v, total);
                          }
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {showValues && <div className="h3">{formatCompactNumber(total)}</div>}
              {showLabels && <div className="grey-caption">{d.date}</div>}
            </div>
          );
        })}
      </div>

      {colorMode === 'multi' && Array.isArray(legend) && legend.length > 0 && (
        <div className="legend" aria-label="legend">
          {legend.map((l, i) => (
            <div key={i} className="legend-item">
              <span className="caption">{l.label}</span>
              <span className="legend-color" style={{ background: l.color }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * clamp(t, 0, 1);
}
