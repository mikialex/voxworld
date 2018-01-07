import { BlockBase } from "./block-base";
import { Canvas2dRenderer } from "../../renderer/canvas2d-renderer";

export class SolidBlock extends BlockBase {
  constructor(name: string, option: any) {
    super(name, option);
    this.color = option.color || '#888';
    this.darkerColor = option.darkerColor || '#444';
  }
  color: string = '#888';
  darkerColor: string = '#444';

  activeColor = '#999';

  draw(renderer: Canvas2dRenderer, x: number, y: number, blockState: any) {
    if (blockState.isPassingBy) {
      renderer.fillRect(this.activeColor, x, y, this.blockWidth, this.blockWidth)
      renderer.fillRect(this.darkerColor, x, y + this.blockWidth, this.blockWidth, this.renderHeight)
    } else {
      renderer.fillRect(this.color, x, y, this.blockWidth, this.blockWidth)
      renderer.fillRect(this.darkerColor, x, y + this.blockWidth, this.blockWidth, this.renderHeight)
    }
  }
}