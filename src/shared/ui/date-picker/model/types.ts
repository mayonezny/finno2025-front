type DatePickerType = 'single' | 'range';

export interface DatePickerProps {
  type?: DatePickerType;
  value: string | [string, string] | null; // ISO string(s)
  onChange: (value: string | [string, string] | null) => void;
  label?: string;
  placeholder?: string | [string, string];
  required?: boolean;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  autoFocus?: boolean;
  dateFormat?: string;
  errorMessage?: string;
  weekStart?: 0 | 1;
  withTime?: boolean;
}

export interface DatePickerRef {
  validate: () => boolean;
  focus: () => void;
  value: string;
}
