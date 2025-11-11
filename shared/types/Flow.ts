export interface XYPosition {
  x: number;
  y: number;
}

export interface XYZPosition extends XYPosition {
  z: number;
}

export interface FlowTransform extends XYZPosition {
  scale: number;
}

export interface Translate {
  x: number;
  y: number;
}

export interface ViewportTransform extends Translate {
  zoom: number;
}

export enum Position {
  CORNER_TOP_LEFT = "corner-top-left",
  TOP = "top",
  CORNER_TOP_RIGHT = "corner-top-right",
  RIGHT = "right",
  CORNER_BOTTOM_RIGHT = "corner-bottom-right",
  BOTTOM = "bottom",
  CORNER_BOTTOM_LEFT = "corner-bottom-left",
  LEFT = "left",
}
