import React, { useMemo } from 'react';

import { Modal } from '@/components/Modal';
import type { FilterDef } from '@/shared/filters/core';
import { useFilters } from '@/shared/filters/useFilters';
import { useSearch } from '@/shared/search/useSearch';
import { SmartTable, type Column, type SmartRow } from '@/shared/SmartTable';
import { Dropdown } from '@/shared/ui/dropdown';
import type { DropdownItem } from '@/shared/ui/dropdown';
import { SearchBar } from '@/shared/ui/search-bar';

import './DataTableModal.scss';

type GroupKey<T extends object> = Extract<keyof T, string>;

export type DataTableModalProps<T extends object> = {
  isOpen: boolean;
  onClose: () => void;
  title: string;

  /** плоские данные для таблицы */
  data: readonly T[];

  /** колонки SmartTable */
  columns: Column<T>[];

  /** поле для группировки + dropdown */
  groupBy: {
    key: GroupKey<T>;
    allLabel?: string; // подпись для «все»
    allToken?: string; // внутреннее значение для «все» (по умолчанию 'all')
  };

  /** поиск по нескольким полям */
  search: {
    fields: GroupKey<T>[];
    placeholder?: string;
  };

  /** содержимое правой части футера (на вход — видимые строки) */
  footerRight?: (visibleRows: readonly T[]) => React.ReactNode;

  /** заголовок слева в футере */
  footerLeftLabel?: string;
};

export function DataTableModal<T extends object>({
  isOpen,
  onClose,
  title,
  data,
  columns,
  groupBy,
  search,
  footerRight,
  footerLeftLabel = 'Всего',
}: DataTableModalProps<T>) {
  const allToken = groupBy.allToken ?? 'all';
  const allLabel = groupBy.allLabel ?? 'Все';

  /** --- Поиск --- */
  const { q, setQ, searched } = useSearch<T>(data, { fields: search.fields });

  /** --- defs как на PaymentsPage (без any и без as const на переменной) --- */
  const defs = useMemo(() => {
    const uniq = Array.from(new Set(searched.map((r) => String(r[groupBy.key]))));

    const defsLocal = [
      {
        key: 'group',
        label: 'Группа',
        options: [
          { label: allLabel, value: allToken },
          ...uniq.map((v) => ({ label: v, value: v })),
        ] as ReadonlyArray<{ label: string; value: string }>,
        predicate: (item: T, v: string) => String(item[groupBy.key]) === v,
        allValue: allToken,
      },
    ] as const;

    // наружу — ровно как у тебя на странице: ReadonlyArray<FilterDef<..., unknown>>
    return defsLocal as ReadonlyArray<FilterDef<T, unknown>>;
  }, [searched, groupBy.key, allLabel, allToken]);

  /** --- фильтрация --- */
  const { state, set, filtered } = useFilters<T, typeof defs>(searched, defs);
  const groupState = state as { group?: typeof allToken | string };

  /** --- dropdown items (мутируемый массив — без readonly-конфликтов) --- */
  const dropdownItems: DropdownItem[] = useMemo(() => {
    const uniq = Array.from(new Set(data.map((r) => String(r[groupBy.key]))));
    return [
      { label: allLabel, value: allToken },
      ...uniq.map<DropdownItem>((v) => ({ label: v, value: v })),
    ];
  }, [data, groupBy.key, allLabel, allToken]);

  /** --- собираем SmartTable rows с rowSpan по groupBy.key --- */
  const rows: SmartRow<T>[] = useMemo(() => {
    const arr = filtered
      .slice()
      .sort((a, b) => String(a[groupBy.key]).localeCompare(String(b[groupBy.key]), 'ru'));

    const out: SmartRow<T>[] = [];
    let i = 0;
    while (i < arr.length) {
      const g = String(arr[i][groupBy.key]);
      const chunk: T[] = [];
      for (let j = i; j < arr.length; j++) {
        if (String(arr[j][groupBy.key]) === g) {
          chunk.push(arr[j]);
        } else {
          break;
        }
      }
      chunk.forEach((r, idx) => {
        out.push({
          data: r,
          // приводим к типу spans компонента
          spans:
            idx === 0
              ? ({ [groupBy.key]: { rowSpan: chunk.length } } as SmartRow<T>['spans'])
              : undefined,
        });
      });
      i += chunk.length;
    }
    return out;
  }, [filtered, groupBy.key]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="data-modal__toolbar">
        <Dropdown
          items={dropdownItems}
          value={groupState.group ?? allToken}
          onChange={(it) => set('group', it.value as never)} // приём как на PaymentsPage
          placeholder={allLabel}
        />
        <SearchBar
          placeholder={search.placeholder ?? 'Поиск'}
          value={q}
          onChange={setQ}
          onSearch={setQ}
          size="m"
        />
      </div>

      <div className="data-modal__table">
        <SmartTable<T> columns={columns} rows={rows} zebra stickyHeader />
      </div>

      <div className="modal__footer">
        <span className="data-modal__footer-left">{footerLeftLabel}</span>
        <span className="data-modal__footer-right">
          {footerRight ? footerRight(filtered) : null}
        </span>
      </div>
    </Modal>
  );
}

export default DataTableModal;
