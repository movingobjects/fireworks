export type Vector = {
  x: number;
  y: number;
};

export interface FireworkSpec {
  color: string;
  radius: number;
  target: Vector;
}