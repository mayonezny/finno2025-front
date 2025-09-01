export type ColorMode = 'single' | 'multi';

export interface BarSegment {
  label?: string;
  value: number;
  color?: string;
}

export interface BarDatum {
  date: string;
  values: BarSegment[];
}

export interface LegendItem {
  label: string;
  color: string;
}

export interface BarChartProps {
  data: BarDatum[];

  showLabels?: boolean;
  showValues?: boolean;

  colorMode?: ColorMode;
  baseColor?: string;

  legend?: LegendItem[];

  maxHeight?: number;
  gap?: number;
  barWidth?: number;

  segmentGap?: number;
  onSegmentClick?: (args: BarSegmentClick) => void;

  sensivity?: number;
}

export type BarSegmentClick = {
  barIndex: number;
  date: string;
  segment: { label?: string; value: number; color?: string };
  total: number;
};
