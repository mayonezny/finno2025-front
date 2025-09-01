import React from 'react';
import './PaymentsToolbar.scss';

import type { Payment, Category, Status } from '@/entities/payments/types';
import {
  toDropdownItems,
  categoryOptions,
  orgOptions,
  statusOptions,
} from '@/pages/PaymentsPage/lib/options';
import { Dropdown } from '@/shared/ui/dropdown';
import type { DropdownItem } from '@/shared/ui/dropdown';
import { SearchBar } from '@/shared/ui/search-bar';

type Props = {
  dataForOrg: readonly Payment[];

  state: {
    category?: 'all' | Category;
    org?: 'all' | string;
    status?: 'all' | Status;
  };

  setCategory: (v: 'all' | Category) => void;
  setOrg: (v: 'all' | string) => void;
  setStatus: (v: 'all' | Status) => void;

  q: string;
  setQ: (v: string) => void;

  className?: string;
};

export const PaymentsToolbar: React.FC<Props> = ({
  dataForOrg,
  state,
  setCategory,
  setOrg,
  setStatus,
  q,
  setQ,
  className,
}) => {
  const categoryValue = state.category ?? 'all';
  const orgValue = state.org ?? 'all';
  const statusValue = state.status ?? 'all';

  return (
    <div className={`payments-toolbar ${className ?? ''}`}>
      <Dropdown
        className="payments-toolbar__dd"
        items={toDropdownItems(categoryOptions)}
        value={categoryValue}
        onChange={(it: DropdownItem) => setCategory(it.value as 'all' | Category)}
        placeholder="Все категории"
      />
      <Dropdown
        className="payments-toolbar__dd"
        items={toDropdownItems(orgOptions(dataForOrg))}
        value={orgValue}
        onChange={(it: DropdownItem) => setOrg(it.value as 'all' | string)}
        placeholder="Все юрлица"
      />
      <Dropdown
        className="payments-toolbar__dd"
        items={toDropdownItems(statusOptions)}
        value={statusValue}
        onChange={(it: DropdownItem) => setStatus(it.value as 'all' | Status)}
        placeholder="Все статусы"
      />
      <SearchBar
        className="payments-toolbar__search"
        value={q}
        onChange={setQ}
        onSearch={setQ}
        placeholder="Поиск"
        size="m"
      />
    </div>
  );
};

export default PaymentsToolbar;
