import { SmartTable, type Column, type SmartRow } from '@/shared/SmartTable';
import { TextWithHint } from '@/shared/ui/textbox-with-hint';
import { type Payment, groupByDateToRows, payments } from '@/utils/demo/payments';
import './payments-page.scss';

export const PaymentsPage: React.FC = () => {
  const columns: Column<Payment>[] = [
    { key: 'date', header: 'Дата', width: '140px' },
    {
      key: 'description',
      header: 'Описание',
      render: (p) => (
        <TextWithHint top={p.description} bottomLeft={p.company} bottomRight={p.bank} sep="•" />
      ),
    },
    { key: 'category', header: 'Категория', width: '140px' },
    { key: 'amount', header: 'Сумма, ₽', align: 'right', width: '140px' },
    { key: 'receiver', header: 'Получатель', width: '160px' },
    { key: 'status', header: 'Статус', width: '140px' }, // сюда потом вставишь свой бейдж
  ];

  const rows: SmartRow<Payment>[] = groupByDateToRows(payments);
  return (
    <div>
      <SmartTable columns={columns} rows={rows} zebra stickyHeader className="payments-table" />
    </div>
  );
};
