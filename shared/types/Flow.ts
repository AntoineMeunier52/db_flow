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
  TOP = "top",
  TOP_MIDDLE = "top-middle",
  RIGHT = "right",
  RIGHT_MIDDLE = "right-middle",
  BOTTOM = "bottom",
  BOTTOM_MIDDLE = "bottom-middle",
  LEFT = "left",
  LEFT_MIDDLE = "left-middle",
}
