import React, { useMemo } from 'react';
import './payments-page.scss';

import { paymentsMock } from '@/entities/payments/payments.data';
import type { Payment, Category, Status } from '@/entities/payments/types';
import type { FilterDef } from '@/shared/filters/core';
import { useFilters } from '@/shared/filters/useFilters';
import { useSearch } from '@/shared/search/useSearch';
import { type Column, type SmartRow, SmartTable } from '@/shared/SmartTable';
import { InfoCard } from '@/shared/ui/info-card';
import { KpiCard } from '@/shared/ui/kpi-card';
import { PaymentsToolbar } from '@/shared/ui/payments-toolbar';

import { categoryOptions, statusOptions, orgOptions } from '../lib/options';

const formatMoney = (n: number) => `${n.toLocaleString('ru-RU', { maximumFractionDigits: 0 })}₽`;

const formatDateRu = (iso: string) => new Date(iso).toLocaleDateString('ru-RU');

const makeFilterDefs = (data: readonly Payment[]) => {
  const defs = [
    {
      key: 'category',
      label: 'Категория',
      options: categoryOptions,
      predicate: (p: Payment, v: Category) => p.category === v,
      allValue: 'all' as const,
    },
    {
      key: 'org',
      label: 'Юрлицо',
      options: orgOptions(data),
      predicate: (p: Payment, v: string) => p.org === v,
      allValue: 'all' as const,
    },
    {
      key: 'status',
      label: 'Статус',
      options: statusOptions,
      predicate: (p: Payment, v: Status) => p.status === v,
      allValue: 'all' as const,
    },
  ] as const;

  return defs as ReadonlyArray<FilterDef<Payment, unknown>>;
};

export const PaymentsPage: React.FC = () => {
  const { q, setQ, searched } = useSearch<Payment>(paymentsMock, {
    fields: ['description', 'org', 'bank', 'category', 'recipient'],
  });

  const defs = makeFilterDefs(searched);
  const { state, set, filtered } = useFilters<Payment, typeof defs>(searched, defs);

  const totalSum = useMemo(() => filtered.reduce((a, p) => a + p.amount, 0), [filtered]);
  const pendingCount = filtered.filter((p) => p.status === 'pending').length;

  const columns: Column<Payment>[] = [
    {
      key: 'date',
      header: 'Дата',
      width: '120px',
      render: (r: Payment) => formatDateRu(r.date),
    },
    {
      key: 'description',
      header: 'Описание',
      render: (r: Payment) => (
        <div className="op-desc">
          <div className="op-desc__title">{r.description}</div>
          <div className="op-desc__sub">
            {r.org} • {r.bank}
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Категория',
      width: '140px',
      render: (r: Payment) => <InfoCard name={r.category} type="neutral" />,
    },
    {
      key: 'amount',
      header: 'Сумма, ₽',
      align: 'right',
      width: '140px',
      render: (r: Payment) => formatMoney(r.amount),
    },
    { key: 'recipient', header: 'Получатель', width: '160px' },
    {
      key: 'status',
      header: 'Статус',
      width: '140px',
      render: (r: Payment) => (
        <InfoCard
          name={
            r.status === 'done' ? 'Выполнено' : r.status === 'pending' ? 'В ожидании' : 'Ошибка'
          }
          type={r.status === 'done' ? 'positive' : r.status === 'pending' ? 'danger' : 'negative'}
        />
      ),
    },
  ];

  const rows: SmartRow<Payment>[] = filtered.map((p) => ({ data: p }));

  return (
    <div className="payments">
      <PaymentsToolbar
        dataForOrg={searched}
        state={
          state as {
            category?: 'all' | Category;
            org?: 'all' | string;
            status?: 'all' | Status;
          }
        }
        setCategory={(v) => set('category', v)}
        setOrg={(v) => set('org', v)}
        setStatus={(v) => set('status', v)}
        q={q}
        setQ={setQ}
      />

      <div className="payments__kpi">
        <KpiCard title="Общая сумма операций" value={totalSum} bordered colorRule={() => 'red'} />
        <KpiCard
          title="Операций найдено"
          value={filtered.length}
          bordered
          colorRule={() => 'red'}
        />
        <KpiCard title="В ожидании" value={pendingCount} bordered colorRule={() => 'red'} />
      </div>

      <div className="payments__table">
        <SmartTable columns={columns} rows={rows} zebra stickyHeader />
      </div>
    </div>
  );
};

export default PaymentsPage;
