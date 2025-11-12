export interface NodeProps {
  id: string;
  type: string;
  component: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  dimensions: {
    width: number;
    height: number;
    unit?: string;
  };
}
