import type { RefObject } from 'react';

export type Align = 'left' | 'right';

export interface TextBubbleDto {
  message: string;
  align?: Align; // default: "left"
  bg?: string; // default: "#d4142a"
  color?: string; // default: "#ffffff"
  /** Тень включить/выключить */
  shadow?: boolean; // default: true
  ref?: RefObject<HTMLDivElement | null>;
  className?: string;
  chatbotAnswer: boolean;
}
