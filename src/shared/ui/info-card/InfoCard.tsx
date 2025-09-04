import React from 'react';
import './InfoCard.scss';

export type infoCardType = 'positive' | 'neutral' | 'negative' | 'danger' | 'glow';

type Props = {
  name: string;
  type?: infoCardType;
  clickable?: boolean;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
};

export const InfoCard: React.FC<Props> = ({
  name = 'Информация',
  type = 'neutral',
  clickable = false,
  onClick,
  className,
  ariaLabel,
}) => {
  const classes = [
    'info-card',
    `${type}-card`,
    'h3',
    clickable ? 'info-card--clickable' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  if (!clickable) {
    return <div className={classes}>{name}</div>;
  }

  return (
    <div
      className={classes}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel ?? name}
      onClick={() => onClick?.()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {name}
    </div>
  );
};
