import React, { useMemo, useState } from 'react';
import './RepaymentChart.scss';

import type { BarSegmentClick } from '@/shared/ui/bar-chart/model/types';
import { BarChart } from '@/shared/ui/bar-chart/ui/BarChart';
import type { DetailCardData } from '@/shared/ui/detail-card/model/types';
import { DetailCard } from '@/shared/ui/detail-card/ui/DetailCard';
import { InfoCard } from '@/shared/ui/info-card';

import type { RepaymentChartProps } from '../model/types';

export const RepaymentChart: React.FC<RepaymentChartProps> = ({
  title = 'График погашения',
  WACD,
  chart,
  buildDetail,
  defaultDetail,
  onDetailOpenChange,
}) => {
  const [detail, setDetail] = useState<DetailCardData | null>(defaultDetail ?? null);
  const [open, setOpen] = useState(Boolean(defaultDetail));

  const handleOpenChange = (o: boolean) => {
    setOpen(o);
    if (!o) {
      setDetail(null);
    }
    onDetailOpenChange?.(o);
  };

  const chartProps = useMemo(
    () => ({
      ...chart,
      onSegmentClick: (args: BarSegmentClick) => {
        const data: DetailCardData = buildDetail?.(args) ?? {
          title: `${args.date}${args.segment?.label ? ` — ${args.segment.label}` : ''}`,
          amount: args.segment?.value ?? 0,
          details: '',
        };

        setDetail(data);
        setOpen(true);
        chart.onSegmentClick?.(args);
      },
    }),
    [chart, buildDetail],
  );

  return (
    <div className={`repayment-chart`}>
      <div className="rc-header">
        <div className="h2">{title}</div>
        {WACD && <InfoCard name={`WACD: ${WACD}%`} type="neutral" />}
      </div>

      <BarChart {...chartProps} />

      {detail && (
        <div className="rc-detail">
          <DetailCard data={detail} open={open} onOpenChange={handleOpenChange} />
        </div>
      )}
    </div>
  );
};
