export type Payment = {
  date: string;
  description: string;
  company: string;
  bank: string;
  category: string;
  amount: string;
  receiver: string;
  status: string; // тут подставишь свой «бейдж» позже
};

// 10 строк для примера (группы по дате 20.01.2025)
export const payments: Payment[] = Array.from({ length: 10 }).map((_, i) => ({
  date: '20.01.2025',
  description: 'Выплата заработной платы сотрудникам',
  company: 'ООО "Основная компания"',
  bank: 'Сбербанк',
  category: 'Зарплаты',
  amount: '1 500 000',
  receiver: 'Сотрудники',
  status: i === 2 ? 'В ожидании' : i === 3 ? 'Ошибка' : 'Выполнено',
}));

// утилита для rowSpan по одинаковой дате
export function groupByDateToRows<T extends { date: string }>(items: T[]) {
  const rows: { data: T; spans?: Record<string, { rowSpan?: number }> }[] = [];
  let i = 0;
  while (i < items.length) {
    const d = items[i].date;
    let cnt = 1;
    while (i + cnt < items.length && items[i + cnt].date === d) {
      cnt++;
    }

    for (let j = 0; j < cnt; j++) {
      rows.push({
        data: items[i + j],
        spans: j === 0 ? { date: { rowSpan: cnt } } : {}, // первая строка тянет дату вниз
      });
    }
    i += cnt;
  }
  return rows;
}
