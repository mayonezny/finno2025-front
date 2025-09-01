export type Status = 'done' | 'pending' | 'error';
export type Category = 'Зарплаты' | 'Налоги' | 'Лизинг' | 'Другое';

export type Payment = {
  id: string;
  date: string;
  description: string;
  org: string;
  bank: string;
  category: Category;
  amount: number;
  recipient: string;
  status: Status;
};
