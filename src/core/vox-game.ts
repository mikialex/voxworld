import { Canvas2dRenderer } from '../renderer/canvas2d-renderer'
import { VoxResource } from "../resource/resource-manage";
import { Player } from '../player'
import { World } from '../world/world'



export class VoxGame {
  constructor(renderer: Canvas2dRenderer, resource: VoxResource, player: Player) {
    this.renderer = renderer;

    //test load
    this.world =new World(resource);
    
    //test draw
    this.world.draw(this.renderer, 50, 50);
    this.world.drawSectorBoundaries(renderer, 50, 50);
    this.world.drawWorldAxis(renderer, 50, 50);
  }

  renderer: Canvas2dRenderer;
  world: World;
  private _RAFid: number;
  private _hasStarted: boolean = false;

  start() {
    if (!this._hasStarted) {
      this._hasStarted = true;
      console.log('game started')
      VoxGame.createMainLoop(this, window.requestAnimationFrame)();
    } else {
      console.log('game has already started')
    }
  }

  stop() {
    this._hasStarted = false;
    console.log('game stoped')
  }


  static createMainLoop(game: VoxGame, RAF: (func: Function) => number) {
    return function mainLoop() {
      if (!game._hasStarted) {
        return;
      }
      game._RAFid = RAF(mainLoop);
      // game.world.draw(game.renderer, 50, 50)
    }
  }


}