export type Align = 'left' | 'right';

export interface TextBubbleDto {
  id: number;
  message: string;
  align?: Align; // default: "left"
  bg?: string; // default: "#d4142a"
  color?: string; // default: "#ffffff"
  /** Тень включить/выключить */
  shadow?: boolean; // default: true

  className?: string;
  chatbotAnswer?: boolean;
}
