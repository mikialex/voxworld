import { ReactiveBase } from "./reactive-base";

export class InputHandler {
  constructor(el: HTMLElement) {
    this.element = el;
    this.element.addEventListener('click',(this.handleCanvasClick).bind(this))
    this.element.addEventListener('mousemove',(this.handleCanvasMouseMove).bind(this))
    this.element.addEventListener('keydown',(this.handleKeyEvent).bind(this))
  }

  element: HTMLElement;
  private reactiveItemList: Array<ReactiveBase> = [];

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
  }


}