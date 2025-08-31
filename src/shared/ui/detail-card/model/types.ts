export type DetailCardData = {
  title: string;
  amount: number | string;
  details?: string;
};

export type DetailCardProps = {
  data: DetailCardData;

  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;

  className?: string;
  style?: React.CSSProperties;
};
