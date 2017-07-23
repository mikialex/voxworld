import { IDrawable } from "../interface/IDrawable";
import { Canvas2dRenderer } from "../renderer/canvas2d-renderer";
import { VoxResource } from "../resource/resource-manage";

export class Block implements IDrawable {
  constructor(typeId: number) {
    this.type = typeId;
  }

  type: number;

  draw(renderer: Canvas2dRenderer, x: number, y: number, resource: VoxResource) {
    if (this.type !== 0) {
      resource.blockCollection.collection[this.type]
        .draw(renderer, x, y)
    }
  }
}