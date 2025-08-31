import React from 'react';

import './Input.scss';
import {
  type ValidationPreset,
  type ValidationRules,
  type ValidationMessages,
  buildConstraints,
  validateValue,
} from '@/shared/lib/validation/validation';

type NativeInputProps = React.ComponentPropsWithoutRef<'input'>;

type InputProps = NativeInputProps & {
  label?: string;
  sublabel?: string;
  hint?: string;
  validationPreset?: ValidationPreset;
  rules?: ValidationRules;
  messages?: ValidationMessages;
  validateOn?: 'blur' | 'change';
  onValue?: (value: string) => void;
};

export const Input: React.FC<InputProps> = ({
  id,
  label,
  sublabel,
  hint,
  validationPreset = 'none',
  rules,
  messages,
  validateOn = 'blur',
  onValue,
  onChange: nativeOnChange,
  onBlur: nativeOnBlur,
  className,
  disabled,
  ...rest
}) => {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  const ref = React.useRef<HTMLInputElement>(null);
  const [error, setError] = React.useState('');

  const constraintAttrs = React.useMemo(
    () => buildConstraints(validationPreset, rules),
    [validationPreset, rules],
  );

  const runValidate = () => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const msg = validateValue(el.value, validationPreset, rules, messages);
    setError(msg);

    el.setCustomValidity(msg);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValue?.(e.target.value);
    if (validateOn === 'change') {
      runValidate();
    }
    nativeOnChange?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (validateOn === 'blur') {
      runValidate();
    }
    nativeOnBlur?.(e);
  };

  const handleInput = () => {
    const el = ref.current;
    if (!el) {
      return;
    }
    if (el.validationMessage) {
      el.setCustomValidity('');
    }
    if (error) {
      setError('');
    }
  };

  return (
    <div className={`input ${className ?? ''}`} data-has-error={Boolean(error)}>
      {label && (
        <label htmlFor={inputId} className="body-regular">
          {label}
        </label>
      )}
      {sublabel && <div className="grey-caption">{sublabel}</div>}

      <input
        {...constraintAttrs}
        {...rest}
        id={inputId}
        ref={ref}
        className="input__field"
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
        onInput={handleInput}
        aria-invalid={Boolean(error)}
        aria-describedby={hint ? `${inputId}-hint` : undefined}
      />

      {error && <div className="input__error caption">{error}</div>}
      {hint && (
        <div id={`${inputId}-hint`} className="grey-caption">
          {hint}
        </div>
      )}
    </div>
  );
};
