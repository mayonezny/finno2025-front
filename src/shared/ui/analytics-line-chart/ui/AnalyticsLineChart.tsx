import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import './AnalyticsLineChart.scss';

type DataObject = Record<string, number>;
type SeriesMap = Record<string, DataObject>;

export type AnalyticsLineChartProps = {
  data: DataObject;
  extraSeries?: SeriesMap;
  color?: string;
  unit?: string;
  secondaryTitle?: string;
  showLegend?: boolean;
  height?: number;
  className?: string;
};

const PALETTE = [
  'var(--color-text, #111)',
  'var(--color-blue, #3b82f6)',
  'var(--color-green, #16a34a)',
  'var(--color-orange, #f59e0b)',
  'var(--color-purple, #8b5cf6)',
];

export const AnalyticsLineChart: React.FC<AnalyticsLineChartProps> = ({
  data,
  extraSeries,
  color = 'var(--color-dark-red)',
  unit = '',
  secondaryTitle,
  showLegend = false,
  height = 220,
  className,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const [width, setWidth] = useState<number>(600);
  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) {
      return;
    }
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.floor(entry.contentRect.width);
        if (w > 0) {
          setWidth(w);
        }
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const labels = useMemo(() => Object.keys(data), [data]);
  const mainValues = useMemo(() => labels.map((k) => data[k]), [labels, data]);

  const extraEntries = useMemo(() => {
    const arr = Object.entries(extraSeries ?? {});
    return arr.map(([name, series]) => ({
      name,
      labels,
      values: labels.map((l) => series[l] ?? NaN),
    }));
  }, [extraSeries, labels]);

  const yAll = useMemo(() => {
    const acc: number[] = [...mainValues];
    extraEntries.forEach((s) => s.values.forEach((v) => Number.isFinite(v) && acc.push(v)));
    return acc.length ? acc : [0];
  }, [mainValues, extraEntries]);

  const yMin = Math.min(...yAll);
  const yMax = Math.max(...yAll);
  const pad = (yMax - yMin) * 0.1 || 1;
  const min = yMin - pad;
  const max = yMax + pad;

  const firstValue = mainValues[0] ?? 0;

  const leftPad = 48;
  const rightPad = 32;
  const topPad = 16;
  const bottomPad = 24;
  const innerW = Math.max(1, width - leftPad - rightPad);
  const innerH = Math.max(1, height - topPad - bottomPad);

  const x = (i: number) => {
    const n = Math.max(1, labels.length - 1);
    return leftPad + (innerW * i) / n;
  };
  const y = (val: number) => {
    const t = (val - min) / (max - min);
    return topPad + innerH * (1 - t);
  };

  const toPath = (vals: number[]) =>
    vals.map((v, i) => `${i ? 'L' : 'M'} ${x(i)} ${y(v)}`).join(' ');
  const mainPath = toPath(mainValues);
  const extraPaths = extraEntries.map((s) => ({
    name: s.name,
    d: toPath(s.values.filter((v) => Number.isFinite(v)) as number[]),
  }));

  const legendEntries = useMemo(() => {
    const base = [{ label: 'Факт', color }];
    const extras = extraEntries.map((s, idx) => ({
      label: s.name,
      color: PALETTE[idx % PALETTE.length],
    }));
    return [...base, ...extras];
  }, [color, extraEntries]);

  const longPressRef = useRef<number | null>(null);
  const isTouchingRef = useRef(false);

  const idxFromPoint = (clientX: number, svgEl: SVGElement) => {
    const rect = svgEl.getBoundingClientRect();
    const px = clientX - rect.left - leftPad;
    const n = Math.max(1, labels.length - 1);
    const ratio = Math.max(0, Math.min(1, px / innerW));
    return Math.round(ratio * n);
  };

  const handlePointerDown: React.PointerEventHandler<SVGSVGElement> = (e) => {
    (e.currentTarget as SVGElement).setPointerCapture?.(e.pointerId);
    if (e.pointerType === 'touch') {
      isTouchingRef.current = true;
      longPressRef.current = window.setTimeout(() => {
        setHoverIdx(idxFromPoint(e.clientX, e.currentTarget));
      }, 220);
    } else {
      setHoverIdx(idxFromPoint(e.clientX, e.currentTarget));
    }
  };

  const handlePointerMove: React.PointerEventHandler<SVGSVGElement> = (e) => {
    if (e.pointerType === 'touch') {
      if (!isTouchingRef.current) {
        return;
      }
      if (hoverIdx !== null) {
        setHoverIdx(idxFromPoint(e.clientX, e.currentTarget));
      }
    } else {
      setHoverIdx(idxFromPoint(e.clientX, e.currentTarget));
    }
  };

  const clearLongPress = () => {
    if (longPressRef.current) {
      clearTimeout(longPressRef.current);
      longPressRef.current = null;
    }
  };

  const handlePointerUp: React.PointerEventHandler<SVGSVGElement> = () => {
    if (isTouchingRef.current && hoverIdx === null) {
      clearLongPress();
    } else {
      setHoverIdx(null);
    }
    isTouchingRef.current = false;
  };

  const handlePointerLeave: React.PointerEventHandler<SVGSVGElement> = () => {
    clearLongPress();
    isTouchingRef.current = false;
    setHoverIdx(null);
  };

  const showTooltip = hoverIdx !== null && hoverIdx >= 0 && hoverIdx < labels.length;
  const tipLabel = showTooltip ? labels[hoverIdx!] : '';
  const tipValue = showTooltip ? mainValues[hoverIdx!] : 0;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!labels.length) {
        return;
      }
      if (e.key === 'Escape') {
        setHoverIdx(null);
        return;
      }
      if (e.key === 'ArrowLeft') {
        setHoverIdx((i) => (i === null ? labels.length - 1 : Math.max(0, i - 1)));
      }
      if (e.key === 'ArrowRight') {
        setHoverIdx((i) => (i === null ? 0 : Math.min(labels.length - 1, i + 1)));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [labels.length]);

  return (
    <div className={`analytics-line-chart ${className ?? ''}`} style={{ height }} ref={wrapperRef}>
      <svg
        className="analytics-line-chart__svg"
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        role="img"
        aria-label="Линейный график"
      >
        {labels.map((lbl, i) => (
          <text
            key={`x-${i}`}
            x={x(i)}
            y={height - 6}
            className="analytics-line-chart__xlabel"
            textAnchor="middle"
          >
            {lbl}
          </text>
        ))}

        <text x={8} y={y(yMin)} className="analytics-line-chart__ylabel">
          {yMin.toFixed(1)}
        </text>
        <text x={8} y={y(firstValue)} className="analytics-line-chart__ylabel">
          {firstValue.toFixed(1)}
        </text>
        <text x={8} y={y(yMax)} className="analytics-line-chart__ylabel">
          {yMax.toFixed(1)}
        </text>

        <line
          x1={leftPad}
          x2={width - rightPad}
          y1={y(yMin)}
          y2={y(yMin)}
          className="analytics-line-chart__grid"
        />
        <line
          x1={leftPad}
          x2={width - rightPad}
          y1={y(firstValue)}
          y2={y(firstValue)}
          className="analytics-line-chart__grid"
        />
        <line
          x1={leftPad}
          x2={width - rightPad}
          y1={y(yMax)}
          y2={y(yMax)}
          className="analytics-line-chart__grid"
        />

        {extraEntries.map((s, idx) => (
          <path
            key={`extra-${s.name}`}
            d={extraPaths[idx].d}
            className="analytics-line-chart__line analytics-line-chart__line--extra"
            style={{ stroke: PALETTE[idx % PALETTE.length] }}
            fill="none"
          />
        ))}

        <path
          d={mainPath}
          className="analytics-line-chart__line"
          style={{ stroke: color }}
          fill="none"
        />
        {mainValues.map((v, i) => (
          <circle
            key={`pt-${i}`}
            cx={x(i)}
            cy={y(v)}
            r={4}
            className="analytics-line-chart__dot"
            style={{ fill: color, stroke: color }}
          />
        ))}

        {showTooltip && (
          <>
            <line
              x1={x(hoverIdx!)}
              x2={x(hoverIdx!)}
              y1={topPad}
              y2={height - bottomPad + 6}
              className="analytics-line-chart__cursor"
            />
            <foreignObject
              x={Math.min(x(hoverIdx!) + 8, width - 220)}
              y={Math.max(topPad, y(tipValue) - 60)}
              width="220"
              height="120"
              className="analytics-line-chart__tooltip"
            >
              <div className="analytics-line-chart__tooltip-wrapper">
                <div className="analytics-line-chart__tooltip-card">
                  <div className="body-regular">{tipLabel}</div>
                  {secondaryTitle && <div className="h3">{secondaryTitle}</div>}
                  <div className="h3" style={{ color }}>
                    {tipValue.toFixed(1)}
                    {unit ? ` ${unit}` : ''}
                  </div>
                </div>
              </div>
            </foreignObject>
          </>
        )}
      </svg>

      {showLegend && (
        <div className="legend" aria-label="legend">
          {legendEntries.map((l, i) => (
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
