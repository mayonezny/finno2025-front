import type { Payment, Category, Status } from '@/entities/payments/types';
import type { Option } from '@/shared/filters/core';
import type { DropdownItem } from '@/shared/ui/dropdown';

export const categoryOptions: ReadonlyArray<Option<'all' | Category>> = [
  { label: 'Все категории', value: 'all' },
  { label: 'Зарплаты', value: 'Зарплаты' },
  { label: 'Налоги', value: 'Налоги' },
  { label: 'Лизинг', value: 'Лизинг' },
  { label: 'Другое', value: 'Другое' },
];

export const statusOptions: ReadonlyArray<Option<'all' | Status>> = [
  { label: 'Все статусы', value: 'all' },
  { label: 'Выполнено', value: 'done' },
  { label: 'В ожидании', value: 'pending' },
  { label: 'Ошибка', value: 'error' },
];

export const orgOptions = (list: readonly Payment[]): ReadonlyArray<Option<'all' | string>> => {
  const uniq = Array.from(new Set(list.map((o) => o.org)));
  return [
    { label: 'Все юрлица', value: 'all' } as const,
    ...uniq.map((org) => ({ label: org, value: org })),
  ];
};

export const toDropdownItems = <V extends string | number>(
  opts: ReadonlyArray<Option<V>>,
): DropdownItem[] => opts.map(({ label, value }) => ({ label, value }));
