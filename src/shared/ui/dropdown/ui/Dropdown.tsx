import { ChevronDown, ChevronUp } from 'lucide-react';
import React from 'react';

import './Dropdown.scss';
import type { DropdownItem, DropdownProps } from '../model/types';

export const Dropdown: React.FC<DropdownProps> = ({
  className,
  items,
  value,
  defaultValue,
  placeholder = 'Выберите…',
  onChange,
  maxVisible = 5,
  disabled = false,
  ...rest
}) => {
  const [open, setOpen] = React.useState(false);
  const isControlled = value !== undefined;
  const [inner, setInner] = React.useState<DropdownItem['value'] | undefined>(defaultValue);

  const rootRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);

  const selected = React.useMemo(() => {
    const selectedValue = isControlled ? value : inner;
    return items.find((i) => i.value === selectedValue);
  }, [items, value, inner, isControlled]);

  const setSelected = (val: DropdownItem['value']) => {
    if (!isControlled) {
      setInner(val);
    }
    const it = items.find((i) => i.value === val);
    if (it) {
      onChange?.(it);
    }
  };

  const toggle = () => !disabled && setOpen((o) => !o);
  const close = () => setOpen(false);

  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current) {
        return;
      }
      if (!rootRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const [activeIndex, setActiveIndex] = React.useState<number>(-1);
  React.useEffect(() => {
    if (!open) {
      return;
    }
    const idx = selected
      ? items.findIndex((i) => i.value === selected.value)
      : items.findIndex((i) => !i.disabled);
    setActiveIndex(idx);
  }, [open]); // eslint-disable-line

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) {
      return;
    }
    const enabledIdxs = items.map((it, idx) => (it.disabled ? -1 : idx)).filter((i) => i >= 0);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) {
        return setOpen(true);
      }
      const cur = enabledIdxs.indexOf(activeIndex);
      const nextIdx = enabledIdxs[Math.min(cur + 1, enabledIdxs.length - 1)];
      if (nextIdx !== undefined) {
        setActiveIndex(nextIdx);
        listRef.current?.children[nextIdx]?.scrollIntoView({ block: 'nearest' });
      }
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) {
        return setOpen(true);
      }
      const cur = enabledIdxs.indexOf(activeIndex);
      const prevIdx = enabledIdxs[Math.max(cur - 1, 0)];
      if (prevIdx !== undefined) {
        setActiveIndex(prevIdx);
        listRef.current?.children[prevIdx]?.scrollIntoView({ block: 'nearest' });
      }
    }
    if (e.key === 'Enter' && open) {
      e.preventDefault();
      const it = items[activeIndex];
      if (it && !it.disabled) {
        setSelected(it.value);
        close();
      }
    }
    if (e.key === 'Escape') {
      close();
    }
    if ((e.key === 'Enter' || e.key === ' ') && !open) {
      e.preventDefault();
      setOpen(true);
    }
  };

  const listMaxHStyle: React.CSSProperties = {
    maxHeight: `calc(40px * ${Math.max(1, maxVisible)})`,
  };

  return (
    <div
      {...rest}
      ref={rootRef}
      className={`dropdown body-regular ${className ?? ''}`}
      data-open={open ? 'true' : 'false'}
      data-disabled={disabled ? 'true' : 'false'}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={onKeyDown}
    >
      <button
        className="dropdown__control"
        type="button"
        onClick={toggle}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={`dropdown__value ${!selected ? 'dropdown__value--placeholder' : ''}`}>
          {selected?.label ?? placeholder}
        </span>
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>

      {open && (
        <ul className="dropdown__list" ref={listRef} role="listbox" style={listMaxHStyle}>
          {items.map((it, idx) => {
            const isActive = idx === activeIndex;
            const isSelected = selected?.value === it.value;
            return (
              <li
                key={String(it.value)}
                role="option"
                aria-selected={isSelected}
                className={`dropdown__item${isActive ? ' is-active' : ''}${isSelected ? ' is-selected' : ''}${
                  it.disabled ? ' is-disabled' : ''
                }`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  if (it.disabled) {
                    return;
                  }
                  setSelected(it.value);
                  close();
                }}
              >
                {it.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
