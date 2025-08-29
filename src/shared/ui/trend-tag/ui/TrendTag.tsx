import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import React from 'react';

import type { TrendTagProps } from '../model/types';
import './TrendTag.scss';

export const TrendTag: React.FC<TrendTagProps> = ({
  value,
  unit,
  direction = 'none',
  showText = true,
}) => {
  const renderIcon = () => {
    switch (direction) {
      case 'up':
        return <TrendingUp size={16} className="trend-icon trend-icon--up" />;
      case 'down':
        return <TrendingDown size={16} className="trend-icon trend-icon--down" />;
      default:
        return <Minus size={16} className="trend-icon trend-icon--none" />;
    }
  };

  return (
    <div className="trend-tag">
      {showText && (
        <span className="body-regular">
          {value}
          {unit ? ` ${unit}` : ''}
        </span>
      )}
      {renderIcon()}
    </div>
  );
};
