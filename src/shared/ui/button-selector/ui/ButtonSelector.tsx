import { motion } from 'framer-motion';
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import './ButtonSelector.scss';
import type { ButtonSelectorProps } from '../model/types';

export const ButtonSelector: React.FC<ButtonSelectorProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  disabled = false,
  size = 'm',
  className,
  ...rest
}) => {
  const isControlled = value !== undefined;
  const [inner, setInner] = useState<string>(defaultValue ?? options[0]?.value ?? '');
  const selected = isControlled ? (value as string) : inner;

  const containerRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  const count = useMemo(() => Math.max(1, options.length), [options.length]);

  const updateIndicator = () => {
    const root = containerRef.current;
    if (!root) {
      return;
    }
    const el = root.querySelector<HTMLButtonElement>(`button[data-value="${selected}"]`);
    if (!el) {
      return;
    }
    const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = el;
    setIndicator({ left: offsetLeft, top: offsetTop, width: offsetWidth, height: offsetHeight });
  };

  useLayoutEffect(() => {
    updateIndicator();
  }, [selected, count]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) {
      return;
    }
    const ro = new ResizeObserver(() => updateIndicator());
    ro.observe(root);
    window.addEventListener('resize', updateIndicator);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateIndicator);
    };
  }, []);

  const selectByIndex = (idx: number) => {
    const it = options[idx];
    if (!it || it.disabled || disabled) {
      return;
    }
    if (!isControlled) {
      setInner(it.value);
    }
    onChange?.(it.value);
  };

  // клавиатура
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) {
      return;
    }
    const enabled = options.map((o, i) => (o.disabled ? -1 : i)).filter((i) => i >= 0);
    const curIndex = Math.max(
      0,
      options.findIndex((o) => o.value === selected),
    );
    const pos = Math.max(0, enabled.indexOf(curIndex));

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      selectByIndex(enabled[Math.min(pos + 1, enabled.length - 1)]);
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      selectByIndex(enabled[Math.max(pos - 1, 0)]);
    }
    if (e.key === 'Home') {
      e.preventDefault();
      selectByIndex(enabled[0]);
    }
    if (e.key === 'End') {
      e.preventDefault();
      selectByIndex(enabled[enabled.length - 1]);
    }
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      selectByIndex(curIndex);
    }
  };

  return (
    <div
      {...rest}
      ref={containerRef}
      className={`button-selector button-selector--${size} ${className ?? ''}`}
      style={{ '--count': count } as React.CSSProperties}
      role="radiogroup"
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={onKeyDown}
      data-disabled={disabled ? 'true' : 'false'}
    >
      {indicator && (
        <motion.div
          className="selector-indicator"
          initial={false}
          animate={indicator}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          aria-hidden="true"
        />
      )}

      {options.map((opt) => {
        const active = opt.value === selected;
        return (
          <button
            key={String(opt.value)}
            type="button"
            role="radio"
            aria-checked={active}
            className={`selector-button${active ? ' is-active' : ''}`}
            data-value={opt.value}
            onClick={() => selectByIndex(options.findIndex((o) => o.value === opt.value))}
            disabled={disabled || opt.disabled}
            title={typeof opt.label === 'string' ? opt.label : undefined}
          >
            <span className="button-content">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};
