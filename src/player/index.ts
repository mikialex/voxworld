import { Canvas2dRenderer } from "../renderer/canvas2d-renderer";
import { EventDispatcher } from "../core/event-dispatcher";
import { ReactiveBase } from "../core/reactive-base";
import { VoxGame } from "../core/vox-game";

export class Player extends ReactiveBase {
  constructor(game:VoxGame) {
    super(game);
  }


  x = 40;
  y = 20;

  draw(renderer: Canvas2dRenderer, x: number, y: number) {
    renderer.fillCircle('#f55', this.x+x, this.y+y, 5);
  }

  pointTest(x:number,y:number) {
    return false;
  }
}