import React from 'react';
import './BulletListGroup.scss';

import { BulletList } from '@/shared/ui/bullet-list';
import { InfoCard, type infoCardType } from '@/shared/ui/info-card/InfoCard';

type Size = 's' | 'm' | 'l';

export type BulletListGroupBlock = {
  title: React.ReactNode;
  items: Array<string | React.ReactNode>;
  size?: Size;
  color?: string;
};

export type BulletListGroupProps = {
  title: React.ReactNode;
  lists: BulletListGroupBlock[];
  twoColumns?: boolean;
  numbered?: boolean;
  className?: string;

  maxWidth?: number | string;

  action?: {
    text: string;
    type?: infoCardType;
    align?: 'start' | 'center' | 'end';
    onClick: () => void;
  };
};

export const BulletListGroup: React.FC<BulletListGroupProps> = ({
  title,
  lists,
  twoColumns = false,
  numbered = true,
  className,
  maxWidth,
  action,
}) => {
  const safeLists = Array.isArray(lists) ? lists : [];

  const renderBlock = (blk: BulletListGroupBlock, idx: number) => {
    const { title: t, items, size = 'm', color = 'var(--color-dark-red)' } = blk;
    const numberedTitle = numbered ? (
      <span>
        <span className="bullet-list-group__num body-medium">{idx + 1}.</span> {t}
      </span>
    ) : (
      t
    );

    return (
      <div key={idx} className="bullet-list-group__cell">
        <BulletList
          title={numberedTitle}
          items={items}
          size={size}
          color={color}
          className="bullet-list-group__list"
        />
      </div>
    );
  };

  const containerStyle: React.CSSProperties = {
    width: '100%',
    ...(maxWidth ? { maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth } : null),
  };

  return (
    <div className={`bullet-list-group ${className ?? ''}`} style={containerStyle}>
      <div className="h2">{title}</div>

      <div
        className={`bullet-list-group__grid ${twoColumns ? 'bullet-list-group__grid--two' : ''}`}
      >
        {safeLists.map((s, i) => renderBlock(s, i))}
      </div>

      {action && (
        <div
          className={`bullet-list-group__action bullet-list-group__action--${action.align ?? 'center'}`}
        >
          <InfoCard
            name={action.text}
            type={action.type ?? 'neutral'}
            clickable
            onClick={action.onClick}
          />
        </div>
      )}
    </div>
  );
};
