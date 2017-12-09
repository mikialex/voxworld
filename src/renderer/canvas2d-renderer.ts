import { IRenderable } from '../interface/IRenderable'
import { VoxResource } from "../resource/resource-manage";

interface squareFace{
  x1: number;y1: number;x2: number;y2: number;
  x3: number;y3: number;x4: number;y4: number;
}

export class Canvas2dRenderer implements IRenderable{
  element: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  devicePixelRatio: number;
  width: number;
  height: number;

  resource: VoxResource;


  constructor(canvas: HTMLElement, resource: VoxResource) {
    this.devicePixelRatio = window.devicePixelRatio || 1;
    this.element = <HTMLCanvasElement>canvas;
    this.ctx = this.element.getContext("2d");
    this.width = this.element.width;
    this.height = this.element.height;
    this.resource = resource;
  }
  render() {
    console.log('rendering')
    // let image = new Image();
    // image.src = '/src/assets/grass1.png';
    // image.onload =  ()=> {
    //   this.ctx.drawImage(image,0,0);
    // }

  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
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

  drawLine(color: string, x1:number,y1:number,x2:number,y2:number) {
    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(x1,y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  fillRect(color: string, x: number, y: number, width: number, height: number) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height)
  }

  fillCircle(color: string, x: number, y: number, r: number) {
    this.ctx.fillStyle = color;
    this.ctx.arc(x, y, r, 0, 2 * Math.PI, true);
    this.ctx.fill();
  }

  paintRectTexture(texture: number, x: number, y: number, width: number, height: number) {
    this.ctx.drawImage(this.resource.textureCollection.collection[texture].image, x, y, width, height);
  }

}