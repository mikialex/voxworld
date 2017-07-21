export interface IRenderable {
  ctx: CanvasRenderingContext2D;
  fillRect(color: string, x: number, y: number, width: number, height: number): void;
}