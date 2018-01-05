import { Canvas2dRenderer } from "../renderer/canvas2d-renderer";
import { EventDispatcher } from "../core/event-dispatcher";
import { ReactiveBase } from "../core/reactive-base";
import { VoxGame } from "../core/vox-game";
import { VoxEvent } from "../core/event";
import { World } from "../world/world";

export interface Point {
  x: number, y: number
}

export interface BoundingBox {
  leftTop: Point,
  leftBottom: Point,
  rightTop: Point,
  rightBottom: Point,
}

export class Player extends ReactiveBase {
  constructor(game: VoxGame) {
    super(game);
    this.on('keyactive', (e: VoxEvent) => { //handle key control
      if (e.payload.keyType === 'ArrowUp') {
        this.vy = Player.vAddReverse(this.vy)
      } else if (e.payload.keyType === 'ArrowDown') {
        this.vy = Player.vAdd(this.vy)
      } else if (e.payload.keyType === 'ArrowLeft') {
        this.vx = Player.vAddReverse(this.vx);
      } else if (e.payload.keyType === 'ArrowRight') {
        this.vx = Player.vAdd(this.vx)
      }
      this.vIdentitify();
    })

    this.on('collision', (e: VoxEvent) => { //handlie collision
      console.log(this.x)
      this.vx = 0;
      this.vy = 0;
      this.x = this.oldx;
      this.y = this.oldy;
    })
  }

  changeVelocity() {
    // this.vx = 1;
  }

  static vPrimary = 15;
  static vPrimarySquare = 225;
  x = 40;
  y = 20;
  oldx = 40;
  oldy = 20;
  vx = 0;
  vy = 0;

  get boundSquare() {
    return {
      leftTop: { x: this.x - 3, y: this.y - 3 },
      leftBottom: { x: this.x - 3, y: this.y + 3 },
      rightTop: { x: this.x + 3, y: this.y - 3 },
      rightBottom: { x: this.x + 3, y: this.y + 3 },
    }
  }

  get vSquare() {
    return this.vx * this.vx + this.vy * this.vy;
  }

  public testObjectCollision(bbox: BoundingBox) {

  }

  public testSelfCollision(world: World) {
    const ret = world.testObjectCollision(this.boundSquare)
    if (ret) {
      this.emit('collision', new VoxEvent('collision'));
    }
    return ret
  }

  public tick(timeSpeed: number) {
    this.vx = Player.vDecay(this.vx);
    this.vy = Player.vDecay(this.vy);
    this.oldx = this.x;
    this.oldy = this.y;
    // this.x = this.x + this.vx * timeSpeed;
    // this.y = this.y + this.vy * timeSpeed;
    this.x = this.x + this.vx * 1;
    this.y = this.y + this.vy * 1;
  }

  private vIdentitify() {
    const ratio = Player.vPrimarySquare / this.vSquare;
    if (ratio < 1) {
      this.vx = this.vx * ratio;
      this.vy = this.vy * ratio;
    }
  }

  static vAdd(v: number) {
    if (v < Player.vPrimary) {
      return v + 2;
    } else if (v >= Player.vPrimary) {
      return Player.vPrimary;
    }
  }

  static vAddReverse(v: number) {
    if (v > -Player.vPrimary) {
      return v - 2;
    } else if (v <= -Player.vPrimary) {
      return -Player.vPrimary;
    }
  }

  static vDecay(v: number) {
    // return 0;
    let decayRate = 1;
    if (v > 0) {
      if (v - decayRate < 0) {
        return 0
      } else {
        return v - decayRate;
      }
    } else if (v === 0) {
      return 0;
    } else if (v < 0) {
      if (v + decayRate > 0) {
        return 0
      } else {
        return v + decayRate;
      }
    }
  }

  draw(renderer: Canvas2dRenderer, x: number, y: number) {
    renderer.fillCircle('#f55', this.x + x, this.y + y, 6);
  }


  pointTest(x: number, y: number) {
    return false;
  }

  dispose() {

  }
}