import type { DetailCardData } from '@/shared/ui/detail-card';

import {
  type RepaymentSegment,
  REPAYMENT_DETAILS_BY_POINT,
  REPAYMENT_DETAILS_BY_LABEL,
  REPAYMENT_DATA,
} from './homepage.data';

export function buildRepaymentDetail(date: string, segment: RepaymentSegment): DetailCardData {
  const label = segment.label ?? 'Платёж';

  const byPoint = REPAYMENT_DETAILS_BY_POINT[date]?.[label];

  const byLabel = REPAYMENT_DETAILS_BY_LABEL[label];

  const details = byPoint?.details ?? byLabel?.details ?? 'Подробности недоступны';

  return {
    title: `${date} — ${label}`,
    amount: segment.value,
    details,
  };
}

export function buildRepaymentDefaultDetail(): DetailCardData {
  const first = REPAYMENT_DATA[0];
  const amount = first.values.reduce((s, v) => s + v.value, 0);
  return {
    title: `${first.date} — ближайший платёж`,
    amount,
    details: first.values
      .map((v) => `${v.label ?? 'Платёж'}: ${v.value.toLocaleString('ru-RU')}`)
      .join(' + '),
  };
}
