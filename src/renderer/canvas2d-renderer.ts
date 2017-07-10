export class canvas2dRenderer {
  element: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  constructor(canvas: HTMLElement) {
    this.element = <HTMLCanvasElement>canvas;
    this.ctx = this.element.getContext("2d");
    
    this.render();
  }
  render() {
    console.log('rendering')
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(10.5, 10, 100, 100);
  }

}