import { X } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';

import { formatCompactNumber } from '@/shared/lib/format/number';

import type { DetailCardProps } from '../model/types';
import './DetailCard.scss';

export const DetailCard: React.FC<DetailCardProps> = ({
  data,
  open,
  defaultOpen,
  onOpenChange,
  className,
  style,
  preventClose = false,
}) => {
  const isControlled = typeof open === 'boolean';
  const [innerOpen, setInnerOpen] = useState(Boolean(defaultOpen));
  const visible = isControlled ? (open as boolean) : innerOpen;

  useEffect(() => {
    if (isControlled) {
      setInnerOpen(Boolean(open));
    }
  }, [isControlled, open]);

  const close = () => {
    if (!isControlled) {
      setInnerOpen(false);
    }
    onOpenChange?.(false);
  };

  const prettyAmount = useMemo(
    () => (typeof data.amount === 'number' ? formatCompactNumber(data.amount) : data.amount),
    [data.amount],
  );

  if (!visible) {
    return null;
  }

  return (
    <div className={`detail-card ${className ?? ''}`} style={style}>
      <div className="detail-card__header">
        <div className="h3">{data.title}</div>
        {!preventClose && (
          <button className="detail-card__close" aria-label="Закрыть" onClick={close}>
            <X size={20} />
          </button>
        )}
      </div>

      <div className="h1">{prettyAmount}</div>
      {data.details && <div className="caption">{data.details}</div>}
    </div>
  );
};
