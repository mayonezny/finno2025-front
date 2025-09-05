import React from 'react';
import { useNavigate } from 'react-router-dom';

import { dioColumns, dioRows } from '@/entities/smart-table/dio.data';
import { dpoColumns, dpoRows } from '@/entities/smart-table/dpo.data';
import { dsoColumns, dsoRows } from '@/entities/smart-table/dso.data';
import type { DsoRow, DpoRow, DioRow } from '@/entities/smart-table/types';
import { formatCompactNumber } from '@/shared/lib/format/number';
import { InfoCard } from '@/shared/ui/info-card';
import { KpiCard } from '@/shared/ui/kpi-card/ui/KpiCard';
import { DataTableModal } from '@/widgets/data-modal';

import { colorRuleLowerIsBetter, colorRuleHigherIsBetter } from '../lib/rules';
import type { WorkingCapitalProps } from '../model/types';
import './WorkingCapital.scss';

const netProfitQuestion = 'По каким метрикам рассчитан цикл оборотного капитала?';

export const WorkingCapital: React.FC<WorkingCapitalProps> = ({
  data,
  unit = 'дней',
  fractionDigits = 3,
  bordered = true,
  background = 'var(--color-second-bg)',
  padding = '12px 16px',
}) => {
  const { dso, dpo, dio } = data;
  const navigate = useNavigate();

  const ccc = dio.value + dso.value - dpo.value;

  const [openDSO, setOpenDSO] = React.useState(false);
  const [openDPO, setOpenDPO] = React.useState(false);
  const [openDIO, setOpenDIO] = React.useState(false);

  const dsoData = React.useMemo<DsoRow[]>(() => dsoRows.map((r) => r.data), []);
  const dpoData = React.useMemo<DpoRow[]>(() => dpoRows.map((r) => r.data), []);
  const dioData = React.useMemo<DioRow[]>(() => dioRows.map((r) => r.data), []);

  const AiQuestionHandler = (text: string) => {
    navigate('/ai');

    setTimeout(() => {
      const input = document.querySelector<HTMLInputElement>('.prompt-bar__input');
      const button = document.querySelector<HTMLButtonElement>('.submit-button');

      if (!input || !button) {
        console.warn('Не найден input или submit-button');
        return;
      }

      input.value = text;
      input.dispatchEvent(new Event('input', { bubbles: true }));

      // клик без сабмита
      setTimeout(() => {
        button.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
      }, 100);

      button.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    }, 100);
  };

  return (
    <div className="working-capital">
      <div className="wc__row">
        <div className="h2">Оборотный капитал</div>
        <InfoCard
          name="Спросить у ИИ"
          type="glow"
          clickable
          onClick={() => AiQuestionHandler(netProfitQuestion)}
        />
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
          onClick={() => setOpenDSO(true)}
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
          onClick={() => setOpenDPO(true)}
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
          onClick={() => setOpenDIO(true)}
        />
      </div>

      <div className="wc__row">
        <div className="h3">Цикл оборотного капитала</div>
        <div className="h3">
          {ccc} {unit}
        </div>
      </div>

      {/* ===== МОДАЛКИ ===== */}

      {/* DSO */}
      <DataTableModal<DsoRow>
        isOpen={openDSO}
        onClose={() => setOpenDSO(false)}
        title="DSO"
        data={dsoData}
        columns={dsoColumns}
        groupBy={{ key: 'counterparty', allLabel: 'Все контрагенты', allToken: 'all' }}
        search={{ fields: ['counterparty'], placeholder: 'Поиск' }}
        footerLeftLabel="Всего"
        footerRight={(rows) => {
          const cnt = new Set(rows.map((r) => r.counterparty)).size;
          return <>{cnt} контрагента</>;
        }}
      />

      {/* DPO */}
      <DataTableModal<DpoRow>
        isOpen={openDPO}
        onClose={() => setOpenDPO(false)}
        title="DPO"
        data={dpoData}
        columns={dpoColumns}
        groupBy={{ key: 'counterparty', allLabel: 'Все контрагенты', allToken: 'all' }}
        search={{ fields: ['counterparty'], placeholder: 'Поиск' }}
        footerLeftLabel="Всего"
        footerRight={(rows) => {
          const cnt = new Set(rows.map((r) => r.counterparty)).size;
          return (
            <>
              {cnt} контрагент{cnt % 10 === 1 && cnt % 100 !== 11 ? '' : 'а'}
            </>
          );
        }}
      />

      {/* DIO */}
      <DataTableModal<DioRow>
        isOpen={openDIO}
        onClose={() => setOpenDIO(false)}
        title="DIO"
        data={dioData}
        columns={dioColumns}
        groupBy={{ key: 'group', allLabel: 'Все товарные группы', allToken: 'all' }}
        search={{ fields: ['group'], placeholder: 'Поиск' }}
        footerLeftLabel="Всего"
        footerRight={(rows) => {
          const cnt = new Set(rows.map((r) => r.group)).size;
          return <>{cnt} товарных групп</>;
        }}
      />
    </div>
  );
};
