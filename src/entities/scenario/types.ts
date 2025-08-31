import type { BarDatum } from '@/shared/ui/bar-chart';
import type { Metric } from '@/widgets/kpi-stats';

export type ScenarioKey = 'pess' | 'base' | 'opt';

export type KpiMetric = Metric;

export interface ScenarioData {
  kpis: KpiMetric[];

  ebitdaPercent: number;
  ebitdaSeries: Record<string, number>;
  ocfToEbitdaBadge: string;
  ebitdaDetail: { title: string; amount: string; details: string };

  netProfitChange: string;
  netProfitBars: BarDatum[];
  netProfitDetail: { title: string; amount: string; details: string };
}
