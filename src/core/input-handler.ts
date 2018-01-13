import { ReactiveBase } from "./reactive-base";
import { EventDispatcher } from "./event-dispatcher";
import { VoxEvent } from "./event";
import { VoxGame } from "./vox-game";

export class InputHandler {
  constructor(game: VoxGame) {
    this.game = game;
    this.element = game.renderer.element;
    this.eventDispatcher = new EventDispatcher(this);
    this.element.addEventListener('click', (this.handleCanvasClick).bind(this))
    this.element.addEventListener('mousemove', (this.handleCanvasMouseMove).bind(this))
    this.element.addEventListener('keydown', (this.handleKeyDownEvent).bind(this))
    this.element.addEventListener('keyup', (this.handleKeyUpEvent).bind(this))
    // this.element.addEventListener('keydown',(this.handleKeyDownEvent).bind(this))
  }

  game: VoxGame
  element: HTMLElement;
  private reactiveItemList: Array<ReactiveBase> = [];
  eventDispatcher: EventDispatcher;

  pressedKey: { [index: string]: boolean } = {}


  on(eventName: string, action: any) {
    this.eventDispatcher.on(eventName, action);
  }

  off(eventName: string, action: any) {
    this.eventDispatcher.off(eventName, action)
  }

  emit(eventName: string, event?: VoxEvent) {
    this.eventDispatcher.emit(eventName, event);
  }

  addReactiveBase(base: ReactiveBase) {
    this.reactiveItemList.push(base);
  }

  handleCanvasClick(e: MouseEvent) {
    // console.log(e);
    if (this.game.hasStarted) {
      const clickPositionWorldX = this.game.camera.worldSpaceXTranstorm(e.offsetX);
      const clickPositionWorldY = this.game.camera.worldSpaceYTranstorm(e.offsetY);
      this.reactiveItemList.forEach((base) => {
        if (base.pointTest(clickPositionWorldX, clickPositionWorldY)) {
          base.emit('click')
        }
      })
    }
  }
  handleCanvasMouseMove(e: MouseEvent) {
    // console.log(e);
  }

  handleKeyDownEvent(e: KeyboardEvent) {
    if (this.game.hasStarted) {
      this.pressedKey[e.code] = true;
      this.eventDispatcher.emit('keydown', new VoxEvent('keydown', { keyType: e.code }))
    }
  }

  handleKeyUpEvent(e: KeyboardEvent) {
    // console.log(e);
    if (this.game.hasStarted) {
      this.pressedKey[e.code] = false;
      this.eventDispatcher.emit('keyup', new VoxEvent('keyup', { keyType: e.code }))
    }
  }

  emitKey() {
    for (const key in this.pressedKey) {
      if (this.pressedKey[key]) {
        this.eventDispatcher.emit('keyactive', new VoxEvent('keyactive', { keyType: key }))
      }
    }
  }


}