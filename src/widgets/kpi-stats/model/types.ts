import type { TrendDirection } from '@/shared/ui/trend-tag';

export type Metric = {
  title: string;
  value: number;
  unit?: string;
  colorRule?: (v: number) => 'green' | 'blue' | 'red';
  trend?: {
    value: number;
    unit?: string;
    direction: TrendDirection;
  };
};

export type KpiStatsProps = {
  title?: string;
  metrics: Metric[];
  layout?: 'horizontal' | 'vertical';
  bordered?: boolean;
  background?: string;
  padding?: string;
  fractionDigits?: number;
  collapsible?: boolean;
};
