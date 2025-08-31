import { Search as SearchIcon } from 'lucide-react';
import React from 'react';
import './SearchBar.scss';

type Native = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange' | 'onInput' | 'onKeyDown' | 'size'
>;

export type SearchBarProps = Native & {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  size?: 'm' | 's';
  trim?: boolean;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  id,
  className,
  placeholder = 'Поиск',
  disabled,
  value,
  defaultValue,
  onChange,
  onSearch,
  size = 'm',
  trim = true,
  ...rest
}) => {
  const autoId = React.useId();
  const inputId = id ?? autoId;

  const controlled = value !== undefined;
  const [inner, setInner] = React.useState<string>(defaultValue ?? '');
  const current = controlled ? String(value ?? '') : inner;

  const setVal = (v: string) => {
    if (!controlled) {
      setInner(v);
    }
    onChange?.(v);
  };

  const submit = () => {
    onSearch?.(trim ? current.trim() : current);
  };

  return (
    <div className={`search-bar search-bar--${size} ${className ?? ''}`}>
      <div className="search-bar__wrap">
        <input
          {...rest}
          id={inputId}
          type="search"
          className="search-bar__field"
          placeholder={placeholder}
          disabled={disabled}
          value={current}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
        />
        <button
          type="button"
          className="search-bar__icon"
          onClick={submit}
          disabled={disabled}
          aria-label="Найти"
          title="Найти"
        >
          <SearchIcon className="search-bar__icon-svg" size={size === 'm' ? 24 : 16} />
        </button>
      </div>
    </div>
  );
};
