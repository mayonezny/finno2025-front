import { SmartTable, type Column } from '@/shared/SmartTable';
import { InfoCard } from '@/shared/ui/info-card';
import { TextWithHint } from '@/shared/ui/textbox-with-hint';
import { type Payment, payments } from '@/utils/demo/payments';
import './payments-page.scss';

const returnColor = (text: string) => {
  switch (text) {
    case 'Выполнено':
      return 'positive';
    case 'В ожидании':
      return 'danger';
    case 'Ошибка':
      return 'negative';
    default:
      return 'neutral';
  }
};

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
    {
      key: 'category',
      header: 'Категория',
      render: (p) => <InfoCard name={p.category} />,
      width: '140px',
    },
    { key: 'amount', header: 'Сумма, ₽', align: 'right', width: '140px' },
    { key: 'receiver', header: 'Получатель', width: '160px' },
    {
      key: 'status',
      header: 'Статус',
      render: (p) => <InfoCard name={p.status} type={returnColor(p.status)} />,
      width: '160px',
    }, // сюда потом вставишь свой бейдж
  ];

  const rows = payments.map((p) => ({ data: p }));
  return (
    <>
      <SmartTable columns={columns} rows={rows} zebra stickyHeader className="payments-table" />
    </>
  );
};
