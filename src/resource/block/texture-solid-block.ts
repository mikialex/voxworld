import { SolidBlock } from "./solid-block";
import { Canvas2dRenderer } from "../../renderer/canvas2d-renderer";
import { Block } from "../../world/block";

export class TextureSolidBlock extends SolidBlock {
  constructor(name: string, option: any) {
    super(name, option)
    this.topTexture = option.topTexture;
    this.bottomTexture = option.bottomTexture;
    if (option.isWall) {
      this.isWall = option.isWall;
    }
  }
  topTexture: string;
  activeColor = '#999';
  bottomTexture: string;
  isWall = false;

  draw(renderer: Canvas2dRenderer, x: number, y: number, blockState: any) {
    if (this.isWall) {
      renderer.paintRectTexture(this.topTexture,
        x, y - this.renderHeight, this.blockWidth, this.blockWidth);
      renderer.paintRectTexture(this.bottomTexture,
        x, y + this.blockWidth - this.renderHeight, this.blockWidth, 2 * this.renderHeight);
    } else {
      // if (blockState.isPassingBy) {
      //   renderer.fillRect(this.activeColor, x, y, this.blockWidth, this.blockWidth)
      //   renderer.paintRectTexture(this.bottomTexture, x, y + this.blockWidth, this.blockWidth, this.renderHeight);
      // } else {
      renderer.paintRectTexture(this.topTexture, x, y, this.blockWidth, this.blockWidth);
      renderer.paintRectTexture(this.bottomTexture, x, y + this.blockWidth, this.blockWidth, this.renderHeight);
      // }
    }
  }

  drawW(item: Block) {
    const renderer = item.game.renderer;
    if (this.isWall) {

      renderer.paintRectTextureFromWorld(this.topTexture,
        item.worldX, item.worldY, this.renderHeight,
        this.blockWidth, this.blockWidth);

      renderer.paintRectTextureFromWorld(this.bottomTexture,
        item.worldX, item.worldY + this.blockWidth - this.renderHeight, item.worldZ,
        this.blockWidth, 2 * this.renderHeight);

    }
    else {

      renderer.paintRectTextureFromWorld(this.topTexture,
        item.worldX, item.worldY, item.worldZ,
        this.blockWidth, this.blockWidth)

      renderer.paintRectTextureFromWorld(this.bottomTexture,
        item.worldX, item.worldY + this.blockWidth, item.worldZ,
        this.blockWidth, this.renderHeight)

    }
  }
}