import React from 'react';
import './WidgetCard.scss';

export type WidgetCardProps = {
  title?: string;
  hint?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

export const WidgetCard: React.FC<WidgetCardProps> = ({
  title,
  hint,
  children,
  footer,
  className = '',
}) => (
  <div className={`widget ${className}`}>
    {(title || hint) && (
      <div className="widget__header">
        {title && <div className="h2">{title}</div>}
        {hint && <div className="widget__hint">{hint}</div>}{' '}
      </div>
    )}
    <div className="widget__body">{children}</div>
    {footer && <div className="widget__footer">{footer}</div>}
  </div>
);
