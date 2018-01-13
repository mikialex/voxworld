import { IDrawable } from "../../interface/IDrawable";
import { Canvas2dRenderer } from "../../renderer/canvas2d-renderer";
import { blockWidth, Block } from "../../world/block";

export abstract class BlockBase {
  constructor(name: string, option: any) {
    this.name = name;
  }

  name: string;
  option: any;

  blockWidth: number = blockWidth;
  renderHeight: number = 20;

  abstract draw(renderer: Canvas2dRenderer, x: number, y: number, blockState: any): void;
  abstract drawW(item: Block): void;

}