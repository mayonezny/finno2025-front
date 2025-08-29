import React from 'react';

import { InfoCard, type infoCardType } from '@/shared/ui/info-card';
import { Treemap, type TreemapItem } from '@/shared/ui/treemap';
import './CashflowTreemap.scss';

type Props = {
  title?: string;
  data: TreemapItem[];
  onTileClick?: (item: TreemapItem) => void;
  infoCardType?: infoCardType;
  infoCardText: string;
};

export const CashflowTreemap: React.FC<Props> = ({
  title = 'Карта денежных потоков',
  data,
  onTileClick,
  infoCardType = 'neutral',
  infoCardText,
}) => {
  const total = data.reduce((s, d) => s + d.value, 0);

  const banksCount = data.length;

  return (
    <div className="cashflow-treemap">
      <div className="cashflow-treemap__header">
        <div className="h2">{title}</div>
        <InfoCard name={infoCardText} type={infoCardType} />
      </div>

      <div className="cashflow-treemap__body">
        <Treemap data={data} onTileClick={onTileClick} />
      </div>

      <div className="cashflow-treemap__footer h3">
        <div>Всего:</div>
        <div>
          <span>{`${(total / 1_000_000).toFixed(1)}M`}</span> / {banksCount} банков
        </div>
      </div>
    </div>
  );
};
