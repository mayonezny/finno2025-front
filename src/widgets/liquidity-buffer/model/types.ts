import type { BarChartProps } from '@/shared/ui/bar-chart/model/types';
import type { ProgressMeterProps } from '@/shared/ui/progress-meter/model/types';
import type { TrendTagProps } from '@/shared/ui/trend-tag/model/types';

export type BreakdownItem = {
  title: string;
  amount: number;
  sharePct?: number;
  trend?: { value: number; direction: 'up' | 'down' | 'none'; unit?: string };
};

export type LiquidityBufferProps = {
  title?: string;
  progress: ProgressMeterProps;
  trend?: TrendTagProps;
  chart: BarChartProps;

  chartRightLabel?: string;

  periodLink?: { label: string; to: string };
  allPaymentsLink?: { label: string; to: string };

  sheet?: {
    title: string;
    items: BreakdownItem[];
  };
};
