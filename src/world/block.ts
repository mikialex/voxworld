import { IDrawable } from "../interface/IDrawable";
import { Canvas2dRenderer } from "../renderer/canvas2d-renderer";
import { VoxResource } from "../resource/resource-manage";

export class Block implements IDrawable {
  constructor(typeId: number, resource: VoxResource) {
    this.type = typeId;
    this.resource = resource;
  }

  type: number;
  resource: VoxResource;

  draw(renderer: Canvas2dRenderer, x: number, y: number) {
    if (this.type !== 0) {
      this.resource.blockCollection.collection[this.type]
        .draw(renderer, x, y)
    }
  }
}