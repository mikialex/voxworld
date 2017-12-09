import { Canvas2dRenderer } from '../renderer/canvas2d-renderer'
import { VoxResource } from "../resource/resource-manage";
import { Player } from '../player'
import { World } from '../world/world'
import { ReactiveBase } from './reactive-base';



export class VoxGame extends ReactiveBase{
  constructor(renderer: Canvas2dRenderer, resource: VoxResource, player: Player) {
    super();
    this.renderer = renderer;
    this.element = renderer.element;
    this.element.addEventListener('click',(this.handleCanvasClick).bind(this))
    this.element.addEventListener('mousemove',(this.handleCanvasMouseMove).bind(this))
    //test load
    this.world = new World(resource);
    this.player = player;
    
    //test draw
    
  }

  element: HTMLCanvasElement;
  renderer: Canvas2dRenderer;
  world: World;
  player: Player;
  private _RAFid: number;
  private _hasStarted: boolean = false;
  preFrameTimeStamp: number;
  afterFrameTimeStamp: number;

  get frameRate() {
    return 60 / (this.afterFrameTimeStamp - this.preFrameTimeStamp)
  }

  handleCanvasClick(e:MouseEvent) {
    console.log(e);
    this.world.testClick(e.offsetX, e.offsetY)
  }
  handleCanvasMouseMove(e: MouseEvent) {
    // console.log(e);
  }

  draw() {
    this.renderer.clear();
    this.world.draw(this.renderer, 50, 50);
    this.world.drawSectorBoundaries(this.renderer, 50, 50);
    this.world.drawWorldAxis(this.renderer, 50, 50);
    this.player.draw(this.renderer, 50, 50);
  }

  start() {
    if (!this._hasStarted) {
      this._hasStarted = true;
      console.log('game started')
      this.emit('gamestart');
      VoxGame.createMainLoop(this, window.requestAnimationFrame)();
    } else {
      console.log('game has already started')
    }
  }

  stop() {
    if (this._hasStarted) {
      this._hasStarted = false;
      this.emit('gamestop');
      console.log('game stoped')
    } else {
      console.log('game has already stoped')
    }
  }


  static createMainLoop(game: VoxGame, RAF: (func: Function) => number) {
    return function mainLoop() {
      if (!game._hasStarted) {
        return;
      }
      game._RAFid = RAF(mainLoop);

      game.preFrameTimeStamp = window.performance.now();

      game.draw();

      game.afterFrameTimeStamp = window.performance.now();
      
      // console.log(game.frameRate)
    }
  }


}