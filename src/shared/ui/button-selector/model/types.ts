export interface ButtonSelectorOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

type NativeDiv = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>;

export interface ButtonSelectorProps extends NativeDiv {
  options: ButtonSelectorOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (selectedValue: string) => void;
  disabled?: boolean;
  size?: 'm' | 's';
}
