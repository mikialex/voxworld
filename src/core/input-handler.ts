import { ReactiveBase } from "./reactive-base";
import { EventDispatcher } from "./event-dispatcher";
import { VoxEvent } from "./event";

export class InputHandler {
  constructor(el: HTMLElement) {
    this.element = el;
    this.eventDispatcher = new EventDispatcher(this);
    this.element.addEventListener('click',(this.handleCanvasClick).bind(this))
    this.element.addEventListener('mousemove',(this.handleCanvasMouseMove).bind(this))
    this.element.addEventListener('keydown',(this.handleKeyEvent).bind(this))
  }

  element: HTMLElement;
  private reactiveItemList: Array<ReactiveBase> = [];
  eventDispatcher: EventDispatcher
  
  on(eventName: string, action: any) {
    this.eventDispatcher.on(eventName, action);
  }

  off(eventName: string, action: any) {
    this.eventDispatcher.off(eventName,action)
  }

  emit(eventName: string, event?: VoxEvent<any>) {
    this.eventDispatcher.emit(eventName,event);
  }

  addReactiveBase(base:ReactiveBase) {
    this.reactiveItemList.push(base);
  }

  handleCanvasClick(e:MouseEvent) {
    // console.log(e);
    this.reactiveItemList.forEach((base) => {
      if (base.pointTest(e.offsetX, e.offsetY)) {
        base.emit('click')
      }
    })

  }
  handleCanvasMouseMove(e: MouseEvent) {
    // console.log(e);
  }

  handleKeyEvent(e:KeyboardEvent) {
    console.log(e);
    this.eventDispatcher.emit('keydown')
  }


}