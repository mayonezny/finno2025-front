import type React from 'react';

import type { TrendTagProps } from '../../trend-tag';

export type Color = 'green' | 'blue' | 'red';

type BaseProps = {
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

export type KpiCardProps = BaseProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>;
