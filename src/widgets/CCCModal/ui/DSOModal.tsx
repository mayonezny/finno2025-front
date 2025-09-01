import React, { useState } from 'react';

import { Modal } from '@/components/Modal';
import { SmartTable, type Column } from '@/shared/SmartTable';
import { TextWithHint } from '@/shared/ui/textbox-with-hint';
import './dso-modal.scss';

// мок-данные
type Row = {
  counterparty: string;
  s0_30: string;
  s31_60: string;
  s60_plus: string;
};

const rows: Row[] = [
  { counterparty: 'ООО "Заказчик 1"', s0_30: '450 тыс', s31_60: '120 тыс', s60_plus: '80 тыс' },
  { counterparty: 'АО "Клиент 2"', s0_30: '320 тыс', s31_60: '90 тыс', s60_plus: '0' },
];

export const DSOModalDemo: React.FC = () => {
  const [open, setOpen] = useState(false);

  const columns: Column<Row>[] = [
    { key: 'counterparty', header: 'Контрагент' },
    { key: 's0_30', header: '0–30 дней, ₽', align: 'left' },
    { key: 's31_60', header: '31–60 дней, ₽', align: 'left' },
    { key: 's60_plus', header: '60+ дней, ₽', align: 'left' },
  ];

  return (
    <>
      <button onClick={() => setOpen(true)}>Открыть DSO</button>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="DSO" className="modal--md">
        {/* панелька над таблицей */}
        <div className="dso-toolbar">
          <select className="dso-select">
            <option>Все контрагенты</option>
          </select>

          <input className="dso-search" placeholder="Поиск" />
        </div>

        {/* твоя таблица */}
        <SmartTable
          columns={columns}
          rows={rows.map((r) => ({ data: r }))}
          compact
          className="dso-table"
        />

        {/* подсуммы/футер при желании */}
        <div className="dso-footer">
          <span>Всего</span>
          <span>2 контрагента</span>
        </div>
      </Modal>
    </>
  );
};
