import React from 'react';
import './smart-table.scss';

export type Column<T> = {
  key: keyof T | string; // ключ поля (или виртуальный ключ для render)
  header: string; // заголовок столбца
  align?: 'left' | 'center' | 'right';
  className?: string;
  width?: string; // опционально фикс/процент/auto
  render?: (row: T, rowIndex: number) => React.ReactNode; // кастомный контент
};

export type CellSpan = { rowSpan?: number; colSpan?: number };
export type RowSpans<T> = Partial<Record<keyof T | string, CellSpan>>;

export type SmartRow<T> = {
  data: T;
  spans?: RowSpans<T>; // где и как объединять ячейки
};

type Props<T> = {
  columns: Column<T>[];
  rows: SmartRow<T>[];
  className?: string;
  compact?: boolean;
  zebra?: boolean;
  stickyHeader?: boolean;
};

export function SmartTable<T>({
  columns,
  rows,
  className = '',
  compact = false,
  zebra = false,
  stickyHeader = true,
}: Props<T>) {
  // трекинг активных rowSpan по индексам столбцов (чтобы пропускать ячейки ниже)
  const activeRowSpans = new Array<number>(columns.length).fill(0);

  return (
    <div
      className={`data-table ${compact ? 'is-compact' : ''} ${zebra ? 'is-zebra' : ''} ${className}`}
    >
      <table>
        <thead className={stickyHeader ? 'is-sticky' : ''}>
          <tr>
            {columns.map((col /*, ci*/) => (
              <th
                key={String(col.key)}
                className={`${col.className ?? ''} ${col.align ? `is-${col.align}` : ''}`}
                style={col.width ? ({ width: col.width } as React.CSSProperties) : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {columns.map((col, ci) => {
                // если над нами висит rowspan — пропускаем ячейку
                if (activeRowSpans[ci] > 0) {
                  activeRowSpans[ci] -= 1;
                  return null;
                }

                const spans = row.spans?.[col.key];
                const rowSpan = spans?.rowSpan ?? 1;
                const colSpan = spans?.colSpan ?? 1;

                // отметить активный rowspan, чтобы пропустить следующие строки
                if (rowSpan > 1) {
                  activeRowSpans[ci] = rowSpan - 1;
                }

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const content = col.render ? col.render(row.data, ri) : (row.data as any)[col.key];

                return (
                  <td
                    key={String(col.key)}
                    rowSpan={rowSpan}
                    colSpan={colSpan}
                    className={`${col.className ?? ''} ${col.align ? `is-${col.align}` : ''}`}
                  >
                    {content}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
