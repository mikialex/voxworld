import { Canvas2dRenderer } from '../renderer/canvas2d-renderer'
import { VoxResource } from "../resource/resource-manage";

export interface IDrawable {
  /**
    * Draws the sprite appropriately to the 2D rendering context.
    * @param ctx  The 2D rendering context
    * @param screenX    The x coordinate of where to draw
    * @param screenY    The y coordinate of where to draw
    */
  draw(renderer: Canvas2dRenderer, screenX: number, screenY: number, resource?: VoxResource): void;

  drawW(): void;

  pushRenderer(renderer: Canvas2dRenderer): void;
  boundSquare: any;
  worldX: number;
  worldY: number;
  worldZ: number;
}