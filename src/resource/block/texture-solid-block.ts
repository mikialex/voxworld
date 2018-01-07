import { SolidBlock } from "./solid-block";
import { Canvas2dRenderer } from "../../renderer/canvas2d-renderer";

export class TextureSolidBlock extends SolidBlock {
  constructor(name: string, option: any) {
    super(name, option)
    this.topTexture = option.topTexture;
    this.bottomTexture = option.bottomTexture;
  }
  topTexture: number;
  bottomTexture: number;
  activeColor = '#999';

  draw(renderer: Canvas2dRenderer, x: number, y: number, blockState: any) {
    if (blockState.isPassingBy) {
      renderer.fillRect(this.activeColor, x, y, this.blockWidth, this.blockWidth)
      renderer.paintRectTexture(this.bottomTexture, x, y + this.blockWidth, this.blockWidth, this.renderHeight);
    } else {
      renderer.paintRectTexture(this.topTexture, x, y, this.blockWidth, this.blockWidth);
      renderer.paintRectTexture(this.bottomTexture, x, y + this.blockWidth, this.blockWidth, this.renderHeight);
    }
  }
}