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
  draw(renderer: Canvas2dRenderer, x: number, y: number) {
    renderer.paintRectTexture(this.topTexture, x, y, 30, 30);
    renderer.paintRectTexture(this.bottomTexture, x, y+30, 30, 20);
  }
}