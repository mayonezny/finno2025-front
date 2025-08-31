export type BulletListSize = 's' | 'm' | 'l';

export type BulletListProps = {
  items: Array<string | React.ReactNode>;
  title?: React.ReactNode;
  size?: BulletListSize;
  color?: string;
  gap?: number;
  className?: string;
};
