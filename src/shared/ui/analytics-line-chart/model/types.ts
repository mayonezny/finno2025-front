export type AnalyticsLineChartDataObject = Record<string, number>;
export type AnalyticsLineChartSeriesMap = Record<string, AnalyticsLineChartDataObject>;

export type AnalyticsLineChartProps = {
  data: AnalyticsLineChartDataObject;
  extraSeries?: AnalyticsLineChartSeriesMap;
  color?: string;
  unit?: string;
  secondaryTitle?: string;
  showLegend?: boolean;
  height?: number;
  className?: string;
};
