export type DropdownItem = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

type NativeDiv = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>;

export type DropdownProps = NativeDiv & {
  items: ReadonlyArray<DropdownItem>;
  value?: DropdownItem['value'];
  defaultValue?: DropdownItem['value'];
  placeholder?: string;
  onChange?: (item: DropdownItem) => void;
  maxVisible?: number;
  disabled?: boolean;
};
