export type BackgroundVariant = "dots" | "lines";

export interface BackgroundProps {
  variant?: BackgroundVariant;
  gap?: number | number[];
  size?: number;
  lineWidth?: number;
  dotRadius?: number;
  color?: string;
  bgColor?: string;
  height?: number;
  width?: number;
  x?: number;
  y?: number;
  offset?: number | [number, number];
}
