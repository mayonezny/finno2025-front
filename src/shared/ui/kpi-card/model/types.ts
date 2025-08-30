import type { TrendTagProps } from '../../trend-tag';

export type Color = 'green' | 'blue' | 'red';

export type KpiCardProps = {
  title?: string;
  subtitle?: string;

  value: number;

  unit?: string;

  fractionDigits?: number;

  colorRule?: (value: number) => Color;

  bordered?: boolean;
  background?: string;
  padding?: string;

  trendTag?: TrendTagProps;
};
