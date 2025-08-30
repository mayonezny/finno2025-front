import React, { useId } from 'react';

import './BulletList.scss';
import type { BulletListProps, BulletListSize } from '../model/types';

type CSSVars = React.CSSProperties & {
  ['--bullet-color']?: string;
};

const textClassBySize: Record<BulletListSize, string> = {
  l: 'h3',
  m: 'body-regular',
  s: 'caption',
};

const titleClassBySize: Record<BulletListSize, string> = {
  l: 'h2',
  m: 'h3',
  s: 'body-regular',
};

export const BulletList: React.FC<BulletListProps> = ({
  items,
  title,
  size = 'm',
  color = 'var(--color-dark-red)',
  className,
}) => {
  const styleVars: CSSVars = { '--bullet-color': color };
  const titleId = useId();
  const textCls = textClassBySize[size];
  const titleCls = titleClassBySize[size];

  return (
    <div className={`bullet-list-wrap ${className ?? ''}`} style={styleVars}>
      {title && (
        <div id={titleId} className={`bullet-list__title ${titleCls}`}>
          {title}
        </div>
      )}

      <ul
        className={`bullet-list bullet-list--${size}`}
        role="list"
        aria-labelledby={title ? titleId : undefined}
      >
        {items.map((it, i) => (
          <li key={i} className="bullet-list__item">
            <span className="bullet-list__marker" aria-hidden="true" />
            <span className={`${textCls}`}>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
