import React from 'react';
import './HomePage.scss';

import {
  KPI_METRICS,
  TREEMAP_TITLE,
  TREEMAP_HHI,
  TREEMAP_DATA,
  LB_TITLE,
  LB_TREND,
  LB_CHART_DATA,
  LB_CHART_RIGHT_LABEL,
  LB_PROGRESS,
  LB_SHEET_TITLE,
  LB_SHEET_ITEMS,
  REPAYMENT_DATA,
  REPAYMENT_LEGEND,
  REPAYMENT_WACD,
  WORKING_CAPITAL_DATA,
  buildRepaymentDetail,
  buildRepaymentDefaultDetail,
} from '@/entities/homepage';
import { useMediaQuery } from '@/utils/hooks/useMediaQuery';
import { CashflowTreemap } from '@/widgets/cashflow-treemap';
import { KpiStats } from '@/widgets/kpi-stats';
import { LiquidityBuffer } from '@/widgets/liquidity-buffer/ui/LiquidityBuffer';
import { RepaymentChart } from '@/widgets/repayment-chart/ui/RepaymentChart';
import { WorkingCapital } from '@/widgets/working-capital';

export const HomePage: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 1149px)');

  return (
    <div className="HomePage">
      <KpiStats
        layout={isMobile ? 'vertical' : 'horizontal'}
        {...(isMobile && { title: 'Ключевые показатели' })}
        collapsible
        metrics={KPI_METRICS}
      />

      <CashflowTreemap
        title={TREEMAP_TITLE}
        HHI={TREEMAP_HHI}
        data={TREEMAP_DATA}
        onTileClick={() => {}}
      />

      <LiquidityBuffer
        title={LB_TITLE}
        trend={LB_TREND}
        progress={LB_PROGRESS}
        chart={{
          data: LB_CHART_DATA,
          showLabels: true,
          showValues: true,
          colorMode: 'single',
          baseColor: '#d70f2d',
          maxHeight: 120,
        }}
        chartRightLabel={LB_CHART_RIGHT_LABEL}
        allPaymentsLink={{ label: 'Все платежи', to: '/payments' }}
        sheet={{ title: LB_SHEET_TITLE, items: LB_SHEET_ITEMS }}
      />

      <RepaymentChart
        title="График погашения"
        WACD={REPAYMENT_WACD}
        chart={{
          data: REPAYMENT_DATA,
          colorMode: 'multi',
          showLabels: true,
          showValues: true,
          maxHeight: 160,
          segmentGap: 8,
          legend: REPAYMENT_LEGEND,
        }}
        buildDetail={({ date, segment }) => buildRepaymentDetail(date, segment)}
        defaultDetail={buildRepaymentDefaultDetail()}
      />

      <WorkingCapital data={WORKING_CAPITAL_DATA} />
    </div>
  );
};
