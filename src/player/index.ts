import { Canvas2dRenderer } from "../renderer/canvas2d-renderer";
import { EventDispatcher } from "../core/event-dispatcher";
import { ReactiveBase } from "../core/reactive-base";

export class Player extends ReactiveBase {
  constructor() {
    super();
  }


  x = 40;
  y = 20;

  draw(renderer: Canvas2dRenderer, x: number, y: number) {
    renderer.fillCircle('#f55', this.x+x, this.y+y, 5);
  }
}