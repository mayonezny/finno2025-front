import type { BarChartProps } from '@/shared/ui/bar-chart/model/types';
import type { DetailCardData } from '@/shared/ui/detail-card/model/types';

export type RepaymentChartProps = {
  title?: string;
  WACD: number;
  chart: BarChartProps;

  buildDetail?: (args: {
    barIndex: number;
    date: string;
    segment: { label?: string; value: number; color?: string };
    total: number;
  }) => DetailCardData;

  defaultDetail?: DetailCardData;

  onDetailOpenChange?: (open: boolean) => void;

  className?: string;
  style?: React.CSSProperties;
};
