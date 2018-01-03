import { Canvas2dRenderer } from "../renderer/canvas2d-renderer";
import { EventDispatcher } from "../core/event-dispatcher";
import { ReactiveBase } from "../core/reactive-base";
import { VoxGame } from "../core/vox-game";
import { VoxEvent } from "../core/event";

export class Player extends ReactiveBase {
  constructor(game:VoxGame) {
    super(game);
    this.on('keyactive', (e: VoxEvent) => {
      console.log('active')
      if (e.payload.keyType === 'ArrowUp') {
        this.vy =   - 5;
      } else if (e.payload.keyType === 'ArrowDown') {
        this.vy =  + 5;
      } else if (e.payload.keyType === 'ArrowLeft') {
        this.vx =   - 5;
      }else if (e.payload.keyType === 'ArrowRight') {
        // this.vx =  Player.vAdd(this.vx);
        this.vx =  +5;
      }
    })
  }

  changeVelocity() {
    // this.vx = 1;
  }

  x = 40;
  y = 20;
  vx = 1;
  vy = 0;

  tick(timeSpeed:number) {
    this.vx = Player.vDecay(this.vx);
    this.vy = Player.vDecay(this.vy);
    this.x = this.x + this.vx * timeSpeed;
    this.y = this.y + this.vy * timeSpeed;
  }

  static vAdd(v: number) {
    if (v < 5) {
      return v + 2;
    } else {
      return v;
    }
  }

  static vDecay(v: number) {
    // return 0;
    let decayRate = 0.5;
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
    renderer.fillCircle('#f55', this.x+x, this.y+y, 5);
  }


  pointTest(x:number,y:number) {
    return false;
  }

  dispose(){

  }
}