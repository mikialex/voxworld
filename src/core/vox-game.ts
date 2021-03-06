import { Canvas2dRenderer } from '../renderer/canvas2d-renderer'
import { VoxResource } from "../resource/resource-manage";
import { Player } from '../player/player'
import { World } from '../world/world'
import { ReactiveBase } from './reactive-base';
import { Camera } from '../camera/camera';
import { InputHandler } from './input-handler';
import { VoxEvent } from './event';



export class VoxGame extends ReactiveBase {
  constructor(renderer: Canvas2dRenderer, resource: VoxResource) {
    super(null);
    this.renderer = renderer;
    this.element = renderer.element;
    this.inputHandler = new InputHandler(this);
    //test load
    this.world = new World(this, resource);
    this.world.initalizeWorld();

    //test draw
    // this.drawList.push()

  }

  element: HTMLCanvasElement;
  renderer: Canvas2dRenderer;
  inputHandler: InputHandler;
  camera: Camera;
  world: World;
  player: Player;
  private _RAFid: number;
  private _hasStarted: boolean = false;
  preFrameTimeStamp: number;
  afterFrameTimeStamp: number;
  FrameAll = 0;
  FrameCount = 0;

  private reportIntervalId = 0;
  private _worldSpeed = 1;

  get hasStarted() {
    return this._hasStarted;
  }
  get frameRate() {
    return 1000 / (this.afterFrameTimeStamp - this.preFrameTimeStamp);
  }
  get averageFrameRate() {
    return this.FrameAll / this.FrameCount;
  }
  get worldSpeed() {
    return this._worldSpeed;

    // return 0.1;
  }

  updataWorldSpeed() {
    if (this.frameRate < 60) {
      const timeD = this.afterFrameTimeStamp - this.preFrameTimeStamp;
      this._worldSpeed = (this.afterFrameTimeStamp - this.preFrameTimeStamp) / 16;
    } else {
      this._worldSpeed = 1;
    }
  }

  addPlayer(player: Player) {
    this.player = player;
  }
  addCamera(camera: Camera) {
    this.camera = camera;
  }


  drawList: Array<any> = [];

  draw() {
    this.renderer.clear();
    this.world.pushRenderer(this.renderer);
    // this.world.drawW();
    // this.world.draw(this.renderer, this.camera.lookAtX, this.camera.lookAtY);
    // this.player.draw(this.renderer, this.camera.lookAtX, this.camera.lookAtY);
    // this.player.drawW();
    this.player.pushRenderer(this.renderer);
    this.renderer.drawRenderList();

    this.world.drawSectorBoundaries(this.renderer, this.camera.lookAtX, this.camera.lookAtY);
    this.world.drawWorldAxis(this.renderer, this.camera.lookAtX, this.camera.lookAtY);

    this.camera.lookAt(300 - this.player.worldX, 200 - this.player.worldY);
  }

  tickWorld() {
    this.player.tick(this.worldSpeed);
    this.player.testSelfCollision(this.world, false);
  }

  updateReport() {
    this.FrameAll += this.frameRate;
    this.FrameCount++;
    this.emit('report', new VoxEvent('report', {
      frameRate: Math.floor(this.frameRate),
      averageFrameRate: Math.floor(this.averageFrameRate),
    }));
  }

  start() {
    if (!this._hasStarted) {
      this._hasStarted = true;
      console.log('game started')
      this.emit('gamestart');
      VoxGame.createMainLoop(this, window.requestAnimationFrame)();
      this.reportIntervalId = window.setInterval((this.updateReport).bind(this), 100);
    } else {
      console.log('game has already started')
    }
  }

  stop() {
    if (this._hasStarted) {
      this._hasStarted = false;
      window.clearInterval(this.reportIntervalId);
      this.emit('gamestop');
      console.log('game stoped')
    } else {
      console.log('game has already stoped')
    }
  }

  pointTest(x: number, y: number) {
    return false;
  }


  static createMainLoop(game: VoxGame, RAF: (func: Function) => number) {
    return function mainLoop() {
      if (!game._hasStarted) {
        return;
      }
      game._RAFid = RAF(mainLoop);

      game.preFrameTimeStamp = window.performance.now();

      game.inputHandler.emitKey();

      game.tickWorld();
      game.draw();

      game.afterFrameTimeStamp = window.performance.now();
      game.updataWorldSpeed();

      // console.log(game.frameRate)
    }
  }


}