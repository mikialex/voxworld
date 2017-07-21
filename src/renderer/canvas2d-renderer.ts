import { IRenderable } from '../interface/IRenderable'

interface squareFace{
  x1: number;y1: number;x2: number;y2: number;
  x3: number;y3: number;x4: number;y4: number;
}
interface Point{
  x: number; y: number;
}

export class Canvas2dRenderer implements IRenderable{
  element: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  devicePixelRatio: number;
  constructor(canvas: HTMLElement) {
    this.devicePixelRatio = window.devicePixelRatio || 1;
    this.element = <HTMLCanvasElement>canvas;
    this.ctx = this.element.getContext("2d");

  }
  render() {
    console.log('rendering')
    // let image = new Image();
    // image.src = '/src/assets/grass1.png';
    // image.onload =  ()=> {
    //   this.ctx.drawImage(image,0,0);
    // }

  }

  drawFace(color:string,points:squareFace) {
    this.ctx.fillStyle = color;
    console.log('rendering')
    this.ctx.beginPath();
    this.ctx.moveTo(points.x1,points.y1);
    this.ctx.lineTo(points.x2,points.y2);
    this.ctx.lineTo(points.x3,points.y3);
    this.ctx.lineTo(points.x4,points.y4);
    this.ctx.fill();
  }

  drawLine(color: string, point1: Point, point2: Point) {
    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(point1.x,point1.y);
    this.ctx.lineTo(point2.x,point2.y);
  }

  fillRect(color: string, x: number, y: number, width: number, height: number) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height)
  }

}