import type { TrendDirection } from '@/shared/ui/trend-tag';

export type MetricInput = {
  value: number;
  trendValue?: number;
  trendDirection?: TrendDirection;
};

export type WorkingCapitalData = {
  dso: MetricInput;
  dpo: MetricInput;
  dio: MetricInput;
};

export type WorkingCapitalProps = {
  data: WorkingCapitalData;
  unit?: string;
  fractionDigits?: number;
  bordered?: boolean;
  background?: string;
  padding?: string;
};
