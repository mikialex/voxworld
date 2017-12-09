import { IDrawable } from "../interface/IDrawable";
import { Canvas2dRenderer } from "../renderer/canvas2d-renderer";
import { VoxResource } from "../resource/resource-manage";
import { blockWidth } from "./sector";
import { ReactiveBase } from "../core/reactive-base";
import { VoxGame } from "../core/vox-game";

export class Block extends ReactiveBase implements IDrawable {
  constructor(typeId: number, game: VoxGame) {
    super(game);
    this.type = typeId;
    this.game = game;
    this.resource = game.world.resource;
    this.on('click', this.test);
  }

  test() {
    console.log('clicked')
    console.log(this);
    if (this.type !== 0) {
      this.type = 0;
    } else {
      this.type = 2;
    }
  }

  type: number;
  game: VoxGame;
  resource: VoxResource;
  screenx: number;
  screeny: number;

  draw(renderer: Canvas2dRenderer, x: number, y: number) {
    this.screenx = x;
    this.screeny = y;
    if (this.type !== 0) {
      this.resource.blockCollection.collection[this.type]
        .draw(renderer, x, y)
    }
  }

  pointTest(x:number,y:number) {
    return x >= this.screenx && x < (this.screenx + blockWidth) && y >= this.screeny && y < (this.screeny + blockWidth)
  }

  testClick(x: number,y:number) {
    if (this.pointTest(x, y)) {
      this.emit('click');
    }
  }

}