import type { NodeProps } from "./Node";

export interface ViewportProps {
  minZoom?: number;
  maxZoom?: number;
  initialZoom?: number;
  nodes: NodeProps[];
}
