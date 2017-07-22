import { IDrawable } from '../interface/IDrawable'
import { Canvas2dRenderer } from '../renderer/canvas2d-renderer'
import { Block } from "./block-base";

export class SolidBlock extends Block {
  constructor(name: string, option: any) {
    super('simple block')
  }
  color: string = '#888';
  darkerColor: string = '#444';

  draw(renderer: Canvas2dRenderer, x: number, y: number) {
    renderer.fillRect(this.color, x, y - this.renderHeight, this.blockWidth, this.blockWidth)
    renderer.fillRect(this.darkerColor, x, y + this.blockWidth - this.renderHeight, this.blockWidth, this.renderHeight)
  }
}