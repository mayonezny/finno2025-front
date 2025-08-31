import React from 'react';
import './textbox-with-hint.scss';

type Props = {
  top: React.ReactNode; // основной текст (жирный)
  bottomLeft?: string; // левый кусок подсказки
  bottomRight?: string; // правый кусок подсказки
  sep?: string; // разделитель между левым и правым (по умолчанию •)
  className?: string;
};

export const TextWithHint: React.FC<Props> = ({
  top,
  bottomLeft,
  bottomRight,
  sep = '•',
  className = '',
}) => {
  const showBottom = bottomLeft || bottomRight;
  return (
    <div className={`twh ${className}`}>
      <div className="twh__top">{top}</div>
      {showBottom && (
        <div className="twh__bottom">
          {bottomLeft && <span className="twh__muted">{bottomLeft}</span>}
          {bottomLeft && bottomRight && <span className="twh__sep">{` ${sep} `}</span>}
          {bottomRight && <span className="twh__muted">{bottomRight}</span>}
        </div>
      )}
    </div>
  );
};
