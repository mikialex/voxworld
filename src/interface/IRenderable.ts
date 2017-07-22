export interface IRenderable {
  ctx: CanvasRenderingContext2D;
  fillRect(color: string, x: number, y: number, width: number, height: number): void;
  fillCircle(color: string, x: number, y: number, r: number): void;
  drawLine(color: string, x1: number, y1: number, x2: number, y2: number): void;
}