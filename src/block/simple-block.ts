import {IDrawable} from '../interface/IDrawable'
import { Canvas2dRenderer } from 'renderer/canvas2d-renderer'

export class SimpleBlock implements IDrawable {
  constructor() {
    
  }
  color: string = '#6bca63';
  blockWidth: number = 30;
  renderHeight: number = 20;
  darkerColor: string = '#498a44';

  draw(renderer: Canvas2dRenderer, x: number, y: number){
    renderer.fillRect(this.color, x, y-this.renderHeight, this.blockWidth, this.blockWidth)
    renderer.fillRect(this.darkerColor, x, y + this.blockWidth-this.renderHeight, this.blockWidth, this.renderHeight)
  }
}