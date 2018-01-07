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
        this.vy = Player.vAddReverse(this.vy, this.game.worldSpeed);
      } else if (e.payload.keyType === 'ArrowDown') {
        this.vy = Player.vAdd(this.vy, this.game.worldSpeed);
      } else if (e.payload.keyType === 'ArrowLeft') {
        this.vx = Player.vAddReverse(this.vx, this.game.worldSpeed);
      } else if (e.payload.keyType === 'ArrowRight') {
        this.vx = Player.vAdd(this.vx, this.game.worldSpeed);
      }
      this.vIdentitify();
    })

    this.on('collision', (e: VoxEvent) => { //handle collision
      const newVx = this.vx;
      const newVy = this.vy;
      const newWorldX = this.worldX;
      const newWorldY = this.worldX;
      //try reset X first;
      this.vx = 0;
      this.worldX = this.oldx;
      console.log(this.testSelfCollision(this.game.world, true))
      if (!this.testSelfCollision(this.game.world, true)) {
        console.log('allow y')
        return
      }
      console.log('y test failed')
      //try reset Y;
      this.vx = newVx;
      this.worldX = newWorldX;
      this.vy = 0;
      this.worldY = this.oldy;
      if (!this.testSelfCollision(this.game.world, true)) {
        console.log('allow x')
        return
      }
      this.vx = 0;
      this.worldX = this.oldx;
    })
  }

  changeVelocity() {
    // this.vx = 1;
  }

  static vPrimary = 5;
  static vPrimarySquare = 25;
  worldX = 40;
  worldY = 20;
  oldx = 40;
  oldy = 20;
  vx = 0;
  vy = 0;

  get boundSquare() {
    return {
      leftTop: { x: this.worldX - 3, y: this.worldY - 3 },
      leftBottom: { x: this.worldX - 3, y: this.worldY + 3 },
      rightTop: { x: this.worldX + 3, y: this.worldY - 3 },
      rightBottom: { x: this.worldX + 3, y: this.worldY + 3 },
    }
  }

  get vSquare() {
    return this.vx * this.vx + this.vy * this.vy;
  }

  public testObjectCollision(object: any) {

  }

  public testSelfCollision(world: World, isJustTest: boolean) {
    return world.testObjectCollision(this, isJustTest)
  }

  public tick(timeSpeed: number) {
    this.vx = Player.vDecay(this.vx, timeSpeed);
    this.vy = Player.vDecay(this.vy, timeSpeed);
    this.oldx = this.worldX;
    this.oldy = this.worldY;
    this.worldX = this.worldX + this.vx * timeSpeed;
    this.worldY = this.worldY + this.vy * timeSpeed;
    // this.x = this.x + this.vx * 1;
    // this.y = this.y + this.vy * 1;
  }

  private vIdentitify() {
    const ratio = Player.vPrimarySquare / this.vSquare;
    if (ratio < 1) {
      this.vx = this.vx * ratio;
      this.vy = this.vy * ratio;
    }
  }

  static vAddRate = 1;

  static vAdd(v: number, dt: number) {
    if (v < Player.vPrimary) {
      return v + Player.vAddRate * dt;
    } else if (v >= Player.vPrimary) {
      return Player.vPrimary;
    }
  }

  static vAddReverse(v: number, dt: number) {
    if (v > -Player.vPrimary) {
      return v - Player.vAddRate * dt;
    } else if (v <= -Player.vPrimary) {
      return -Player.vPrimary;
    }
  }

  static vDecay(v: number, dt: number) {
    // return 0;
    let decayRate = 0.5 * dt;
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
    renderer.fillCircle('#f55', this.worldX + x, this.worldY + y, 6);
  }


  pointTest(x: number, y: number) {
    return false;
  }

  dispose() {

  }
}