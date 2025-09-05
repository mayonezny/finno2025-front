// types/pirozhki-report.ts

/** ISO дата: 'YYYY-MM-DD' */
export type ISODate = string;

/** Денежные суммы в рублях (integer/number). */
export type Rub = number;

/** Значение + абсолютное изменение к предыдущей неделе (в тех же единицах). */
export type ValueChange<T extends number = number> = {
  value: T;
  change: T; // абсолютное изменение (может быть отрицательным)
};

/** Значение + изменение в процентах (например, выручка неделя-к-неделе). */
export type PctChange<T extends number = number> = {
  value: T;
  change_pct: number; // процентное изменение (-2.3 = -2.3%)
};

/** Один недельный срез. Корневой JSON — массив WeeklyReport. */
export interface WeeklyReport {
  date: ISODate; // дата формирования отчёта (начало/конец недели по твоей бизнес-логике)
  report: Report;
}

export interface Report {
  company?: Company; // опционально (в части недель может не дублироваться)
  summary: SummaryBlock;
  revenue_block?: RevenueBlock; // есть во всех примерах, оставил опциональным на случай разных профилей
  debt_profile?: DebtProfileDay[]; // 7 объектов на неделю (по дням)
  cash_flow?: CashFlowBlock;
  profit?: ProfitBlock;
  operations?: OperationRow[]; // как в таблице на скрине
  counterparties?: Counterparties; // урезанный блок
}

/* -------------------- Company -------------------- */

export interface Company {
  name: string; // ООО «Пирожки»
  brand: string; // Пирожки
  industry: string; // FMCG, пекарня и т.д.
  hq_city: string; // Коломна
  sales_region: string[]; // ["Москва", "МО", ...]
}

/* -------------------- Summary -------------------- */

export interface SummaryBlock {
  free_cash: ValueChange<Rub>;
  undrawn_limits: ValueChange<Rub>;
  liquidity_buffer_days: ValueChange<number>;
  avg_daily_outflow: ValueChange<Rub>;
  net_debt: ValueChange<Rub>;
  ccc_days: ValueChange<number>;
  dio_days: ValueChange<number>;
  dpo_days: ValueChange<number>;
  dso_days: ValueChange<number>;
  debt_service_coverage_ratio: ValueChange<number>; // DSCR
  ebit: ValueChange<Rub>;
  ebitda: ValueChange<Rub>;
  ebitda_margin: ValueChange<number>; // доля (0..1)
  cash_inflows_total: ValueChange<Rub>;
  cash_outflows_total: ValueChange<Rub>;

  // без "change" по твоему ТЗ:
  hhi_customer: number; // 0..1
  wacd: number; // средневзвешенная стоимость долга (доля 0..1)
}

/* -------------------- Revenue -------------------- */

export interface RevenueBlock {
  /** Чистая выручка за период + изменение в % к прошлой неделе. */
  net_sales: PctChange<Rub>;
}

/* -------------------- Debt profile (7 дней недели) -------------------- */

/** Типы записей долга. Используем русские метки, как в данных. */
export type DebtType = 'кредит' | 'облигация' | 'лизинг';

export interface DebtProfileBase {
  date: ISODate;
  type: DebtType;
  /** Сумма планового платежа по этому инструменту в этот день. */
  amount: Rub;
}

/** Инфо по кредиту (bank loan). Дискриминированный юнион по `type: "кредит"`. */
export interface DebtCredit extends DebtProfileBase {
  type: 'кредит';
  info: {
    description: string; // "Кредит Сбербанк"
    issuer: string; // банк
    rate: number; // эффективная ставка (доля)
    principal?: Rub; // тело платежа
    interest?: Rub; // проценты платежа
    covenants?: string; // текст ковенантов
  };
}

/** Инфо по облигации. */
export interface DebtBond extends DebtProfileBase {
  type: 'облигация';
  info: {
    description: string; // "Серия PP-01"
    coupon: number; // купон (доля)
    series: string; // идентификатор серии
    nkd?: Rub; // накопленный купонный доход
  };
}

/** Инфо по лизингу. */
export interface DebtLeasing extends DebtProfileBase {
  type: 'лизинг';
  info: {
    description: string; // "Линия выпечки №2"
    issuer: string; // лизингодатель
    rate: number; // ставка (доля)
    outstanding?: Rub; // остаток задолженности по договору
  };
}

/** Одна запись графика на день. */
export type DebtProfileDay = DebtCredit | DebtBond | DebtLeasing;

/* -------------------- Cash flow -------------------- */

export interface CashFlowBlock {
  inflows: CashFlowEntry[];
  outflows: CashFlowEntry[];
}

/** Один поток денег (приток/отток) с долей от суммы блока. */
export interface CashFlowEntry {
  /** Для inflows: source, для outflows: use — оставим общее поле label, чтобы было единообразно в UI. */
  source?: string;
  use?: string;
  amount: Rub;
  /** Доля в рамках total inflows/outflows (0..1). */
}

/* -------------------- Profit -------------------- */

export interface ProfitBlock {
  /** Сумма чистой прибыли за неделю. */
  amount: Rub;
  /** Дневная разбивка 7 дней. */
  daily: DailyNetProfit[];
}

export interface DailyNetProfit {
  date: ISODate;
  net_profit: Rub;
}

/* -------------------- Operations (таблица) -------------------- */

export type OperationStatus = 'Выполнено' | 'В ожидании' | 'Ошибка';

export interface OperationRow {
  date: ISODate;
  description: string;
  category: string; // Зарплаты / Налоги / Лизинг / Другое ...
  amount: Rub; // сумма операции (положительная — как в твоей таблице)
  receiver: string; // получатель
  status: OperationStatus;
}

/* -------------------- Counterparties -------------------- */

export interface Counterparties {
  customers?: CustomerShort[];
  suppliers?: SupplierShort[];
}

export interface CustomerShort {
  name: string;
  share_of_sales?: number; // доля в выручке (0..1)
}

export interface SupplierShort {
  name: string;
  purchases_month?: Rub;
}

/* -------------------- Корневой тип JSON -------------------- */

/** Твой полный JSON — массив недельных отчётов. */
export type WeeklyDataset = WeeklyReport[];

export type TrendDirection = 'up' | 'down' | 'none';
