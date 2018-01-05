import { IDrawable } from "../interface/IDrawable";
import { Canvas2dRenderer } from "../renderer/canvas2d-renderer";
import { VoxResource } from "../resource/resource-manage";
import { blockWidth } from "./sector";
import { ReactiveBase } from "../core/reactive-base";
import { VoxGame } from "../core/vox-game";
import { BoundingBox } from "../player/player";

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

  get boundSquare() {
    return {
      leftTop: { x: this.screenx, y: this.screeny },
      leftBottom: { x: this.screenx, y: this.screeny + 30 },
      rightTop: { x: this.screenx + 30, y: this.screeny },
      rightBottom: { x: this.screenx + 30, y: this.screeny + 30 },
    }
  }


  public testObjectCollision(bbox: BoundingBox) {
    if (this.type == 0) {
      const outMinX = bbox.leftTop.x;
      const outMaxX = bbox.rightTop.x;
      const outMinY = bbox.leftTop.y;
      const outMaxY = bbox.rightBottom.y;

      const selfMinX = this.boundSquare.leftTop.x;
      const selfMaxX = this.boundSquare.rightTop.x;
      const selfMinY = this.boundSquare.leftTop.y;
      const selfMaxY = this.boundSquare.rightBottom.y;
      if (outMinX <= selfMaxX && outMaxX >= selfMinX
        && outMinY <= selfMaxY && outMaxY >= selfMinY) {
        return true;
      } else {
        return false;
      }
    }
    return false
  }

  draw(renderer: Canvas2dRenderer, x: number, y: number) {
    this.screenx = x;
    this.screeny = y;
    if (this.type !== 0) {
      this.resource.blockCollection.collection[this.type]
        .draw(renderer, x, y)
    }
  }

  pointTest(x: number, y: number) {
    return x >= this.screenx && x < (this.screenx + blockWidth) && y >= this.screeny && y < (this.screeny + blockWidth)
  }

  testClick(x: number, y: number) {
    if (this.pointTest(x, y)) {
      this.emit('click');
    }
  }

}