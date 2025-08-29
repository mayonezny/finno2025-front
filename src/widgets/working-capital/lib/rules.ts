import type { Color } from '@/shared/ui/kpi-card/model/types';

export const colorRuleLowerIsBetter = (v: number, baseline = 0): Color =>
  v > baseline ? 'red' : v < baseline ? 'green' : 'blue';

export const colorRuleHigherIsBetter = (v: number, baseline = 0): Color =>
  v > baseline ? 'green' : v < baseline ? 'red' : 'blue';
