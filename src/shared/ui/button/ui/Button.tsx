import React from 'react';
import './Button.scss';

type Variant = 'primary' | 'outline';
type Size = 'normal' | 'small';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'normal',
  fullWidth = false,
  className,
  ...rest
}) => (
  <button
    className={[
      'btn',
      `btn--${variant}`,
      `btn--${size}`,
      fullWidth ? 'btn--block' : '',
      className ?? '',
    ].join(' ')}
    {...rest}
  >
    {children}
  </button>
);
