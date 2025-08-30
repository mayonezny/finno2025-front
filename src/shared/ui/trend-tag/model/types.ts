export type TrendDirection = 'up' | 'down' | 'none';

export type TrendTagProps = {
  value: number;
  unit?: string;
  direction?: TrendDirection;
  showText?: boolean;
};
