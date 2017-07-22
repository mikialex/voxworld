import { IDrawable } from '../interface/IDrawable'
import { Canvas2dRenderer } from '../renderer/canvas2d-renderer'
import { SolidBlock } from "./solid-block";

export class TextureSolidBlock extends SolidBlock {
  constructor() {
    super()
  }
  color: string = '#6bca63';
  darkerColor: string = '#63a05e';

  draw(renderer: Canvas2dRenderer, x: number, y: number) {
    renderer.fillRect(this.color, x, y - this.renderHeight, this.blockWidth, this.blockWidth)
    renderer.fillRect(this.darkerColor, x, y + this.blockWidth - this.renderHeight, this.blockWidth, this.renderHeight)
  }
}