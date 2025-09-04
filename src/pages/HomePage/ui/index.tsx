import React, { useMemo } from 'react';
import './HomePage.scss';

import { useSelector } from 'react-redux';

import {
  TREEMAP_TITLE,
  TREEMAP_HHI,
  TREEMAP_DATA,
  REPAYMENT_DATA,
  REPAYMENT_LEGEND,
  REPAYMENT_WACD,
  buildRepaymentDetail,
  buildRepaymentDefaultDetail,
} from '@/entities/homepage';
import {
  mapWeeklyToKpis,
  mapWeeklyToLiqBuffer,
  mapWeeklyToWorkingCapital,
} from '@/entities/homepage/homepage.mapper';
import { cashColumns, cashRows } from '@/entities/smart-table/cashflows.data';
import { fmtMoneyRu } from '@/entities/smart-table/smartTable.format';
import type { CashAccountRow } from '@/entities/smart-table/types';
import type { RootState } from '@/redux-rtk';
import { useMediaQuery } from '@/utils/hooks/useMediaQuery';
import { CashflowTreemap } from '@/widgets/cashflow-treemap';
import DataTableModal from '@/widgets/data-modal/ui/DataTableModal';
import { KpiStats } from '@/widgets/kpi-stats';
import { LiquidityBuffer } from '@/widgets/liquidity-buffer/ui/LiquidityBuffer';
import { RepaymentChart } from '@/widgets/repayment-chart/ui/RepaymentChart';
import { WorkingCapital } from '@/widgets/working-capital';

export const HomePage: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 1149px)');
  const [cashOpen, setCashOpen] = React.useState(false);

  const cashData: CashAccountRow[] = React.useMemo(() => cashRows.map((r) => r.data), []);

  const weekly = useSelector((s: RootState) => {
    const data = s.statsReducer.stats;
    return data[data.length - 1];
  });

  const metrics = useMemo(() => mapWeeklyToKpis(weekly), [weekly]);
  const liqbuf = mapWeeklyToLiqBuffer(weekly);
  const workingCapital = mapWeeklyToWorkingCapital(weekly);

  return (
    <div className="HomePage">
      <KpiStats
        layout={isMobile ? 'vertical' : 'horizontal'}
        {...(isMobile && { title: 'Ключевые показатели' })}
        collapsible
        metrics={metrics}
      />

      <CashflowTreemap
        title={TREEMAP_TITLE}
        HHI={TREEMAP_HHI}
        data={TREEMAP_DATA}
        onTileClick={() => setCashOpen(true)}
      />

      <DataTableModal<CashAccountRow>
        isOpen={cashOpen}
        onClose={() => setCashOpen(false)}
        title="Денежные потоки"
        data={cashData}
        columns={cashColumns}
        groupBy={{ key: 'bank', allLabel: 'Все банки', allToken: 'all' }}
        search={{ fields: ['bank', 'account'], placeholder: 'Поиск' }}
        footerLeftLabel="Всего"
        footerRight={(rows) => {
          const total = rows.reduce((a, r) => a + r.balance, 0);
          const banks = new Set(rows.map((r) => r.bank)).size;
          return (
            <>
              {fmtMoneyRu(total)}&nbsp;/&nbsp;{banks} Банков
            </>
          );
        }}
      />

      <LiquidityBuffer
        title={liqbuf.title}
        progress={liqbuf.progress}
        chart={liqbuf.chart}
        chartRightLabel={liqbuf.chartRightLabel}
        allPaymentsLink={liqbuf.allPaymentsLink}
        sheet={liqbuf.sheet}
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

      <WorkingCapital data={workingCapital} />
    </div>
  );
};

export default HomePage;
