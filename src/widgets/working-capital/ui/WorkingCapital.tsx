import React from 'react';

import { formatCompactNumber } from '@/shared/lib/format/number';
import { InfoCard } from '@/shared/ui/info-card';
import { KpiCard } from '@/shared/ui/kpi-card/ui/KpiCard';

import { colorRuleLowerIsBetter, colorRuleHigherIsBetter } from '../lib/rules';
import type { WorkingCapitalProps } from '../model/types';
import './WorkingCapital.scss';

export const WorkingCapital: React.FC<WorkingCapitalProps> = ({
  data,
  unit = 'дней',
  fractionDigits = 3,
  bordered = true,
  background = 'var(--color-second-bg)',
  padding = '12px 16px',
}) => {
  const { dso, dpo, dio } = data;

  const ccc = dio.value + dso.value - dpo.value;
  const operatingCycle = dio.value + dso.value;

  return (
    <div className="working-capital">
      <div className="wc__row">
        <div className="h2">Оборотный капитал</div>
        <InfoCard name={`CCC: ${formatCompactNumber(ccc, fractionDigits)} ${unit}`} />
      </div>

      <div className="wc__wrapper">
        <KpiCard
          title="DSO"
          value={dso.value}
          unit={unit}
          fractionDigits={fractionDigits}
          colorRule={(v) => colorRuleLowerIsBetter(v)}
          trendTag={{
            value: dso.trendValue ?? 0,
            unit,
            direction: dso.trendDirection ?? 'none',
            showText: true,
          }}
          bordered={bordered}
          background={background}
          padding={padding}
        />

        <KpiCard
          title="DPO"
          value={dpo.value}
          unit={unit}
          fractionDigits={fractionDigits}
          colorRule={(v) => colorRuleHigherIsBetter(v)}
          trendTag={{
            value: dpo.trendValue ?? 0,
            unit,
            direction: dpo.trendDirection ?? 'none',
            showText: true,
          }}
          bordered={bordered}
          background={background}
          padding={padding}
        />

        <KpiCard
          title="DIO"
          value={dio.value}
          unit={unit}
          fractionDigits={fractionDigits}
          colorRule={(v) => colorRuleLowerIsBetter(v)}
          trendTag={{
            value: dio.trendValue ?? 0,
            unit,
            direction: dio.trendDirection ?? 'none',
            showText: true,
          }}
          bordered={bordered}
          background={background}
          padding={padding}
        />
      </div>

      <div className="wc__row">
        <div className="h3">Цикл оборотного капитала</div>
        <div className="h3">
          {operatingCycle + dpo.value} {unit}
        </div>
      </div>
    </div>
  );
};
