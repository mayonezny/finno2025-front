import {
  hierarchy,
  treemap as d3Treemap,
  treemapSquarify,
  type HierarchyRectangularNode,
} from 'd3-hierarchy';
import { scaleLinear } from 'd3-scale';
import { interpolateBlues } from 'd3-scale-chromatic';
import React, { useMemo, useRef, useLayoutEffect, useState } from 'react';
import './Treemap.scss';

export type TreemapItem = {
  id: string;
  title: string;
  value: number;
};

type Props = {
  data: TreemapItem[];
  className?: string;
  minLabelPercent?: number;
  cornerRadius?: number;
  paddingInner?: number;
  onTileClick?: (item: TreemapItem) => void;
};

function formatMoneyShort(v: number) {
  if (v >= 1_000_000_000) {
    return `${(v / 1_000_000_000).toFixed(1)}B`;
  }
  if (v >= 1_000_000) {
    return `${(v / 1_000_000).toFixed(1)}M`;
  }
  if (v >= 1_000) {
    return `${(v / 1_000).toFixed(1)}K`;
  }
  return `${v}`;
}

export const Treemap: React.FC<Props> = ({
  data,
  className,
  minLabelPercent = 0.05,
  cornerRadius = 16,
  paddingInner = 4,
  onTileClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 800, h: 480 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const obs = new ResizeObserver((entries) => {
      const r = entries[0].contentRect;
      setSize({ w: Math.max(1, r.width), h: Math.max(1, r.height) });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const total = useMemo(() => data.reduce((s, x) => s + x.value, 0), [data]);

  const nodes = useMemo(() => {
    const root = hierarchy<{ children: TreemapItem[] }>({ children: data }).sum(
      (d) => (d as unknown as TreemapItem).value ?? 0,
    );

    const treemapLayout = d3Treemap<{ children: TreemapItem[] }>()
      .size([size.w, size.h])
      .paddingInner(paddingInner)
      .tile(treemapSquarify.ratio(1));

    treemapLayout(root);

    return root.leaves() as unknown as HierarchyRectangularNode<TreemapItem>[];
  }, [data, size.w, size.h, paddingInner]);

  const [minVal, maxVal] = useMemo(() => {
    const vals = data.map((d) => d.value);
    return [Math.min(...vals), Math.max(...vals)];
  }, [data]);

  const color = useMemo(() => {
    const scale = scaleLinear<number, number>().domain([minVal, maxVal]).range([0.2, 1]);
    return (v: number) => interpolateBlues(scale(v));
  }, [minVal, maxVal]);

  return (
    <div ref={ref} className={`treemap ${className ?? ''}`}>
      {nodes.map((n) => {
        const item = n.data;
        const w = Math.max(0, n.x1 - n.x0);
        const h = Math.max(0, n.y1 - n.y0);
        const pct = total > 0 ? item.value / total : 0;

        const style: React.CSSProperties = {
          left: n.x0,
          top: n.y0,
          width: w,
          height: h,
          background: color(item.value),
          borderRadius: cornerRadius,
        };

        return (
          <button
            key={item.id}
            className="treemap__tile"
            style={style}
            title={`${item.title}: ${formatMoneyShort(item.value)} (${(pct * 100).toFixed(0)}%)`}
            onClick={onTileClick ? () => onTileClick(item) : undefined}
          >
            {pct < minLabelPercent ? (
              <div className="treemap__plus">+</div>
            ) : (
              <div className="treemap__label">
                <div className="caption">{item.title}</div>
                <div className="body-regular">{formatMoneyShort(item.value)}</div>
                <div className="caption">{(pct * 100).toFixed(0)}%</div>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};
