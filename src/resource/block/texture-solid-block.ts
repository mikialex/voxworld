import { SolidBlock } from "./solid-block";
import { Canvas2dRenderer } from "../../renderer/canvas2d-renderer";

export class TextureSolidBlock extends SolidBlock {
  constructor(name: string, option: any) {
    super(name,option)
  }
  color: string = '#6bca63';
  darkerColor: string = '#63a05e';

  draw(renderer: Canvas2dRenderer, x: number, y: number) {
    renderer.fillRect(this.color, x, y - this.renderHeight, this.blockWidth, this.blockWidth)
    renderer.fillRect(this.darkerColor, x, y + this.blockWidth - this.renderHeight, this.blockWidth, this.renderHeight)
  }
}