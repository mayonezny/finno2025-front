export type Rub = number;
export type Days = number;

export interface DpoRow {
  counterparty: string;
  b0_30: Rub;
  b31_60: Rub;
  b60p: Rub;
}

export interface DsoRow {
  counterparty: string;
  b0_30: Rub;
  b31_60: Rub;
  b60p: Rub;
}

export interface DioRow {
  group: string;
  onStock: Rub;
  days: Days;
}

export interface CashAccountRow {
  bank: string;
  account: string;
  balance: Rub;
  sharePct: number;
}
