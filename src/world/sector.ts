import { BlockCollection } from '../resource/block/block-collection'
import { Canvas2dRenderer } from '../renderer/canvas2d-renderer'
import { IDrawable } from "../interface/IDrawable";
import { VoxResource } from "../resource/resource-manage";
import { Block } from "./block";



export class Sector implements IDrawable{
  constructor(blockCollection:VoxResource,x:number,y:number,map:Array<Array<number>>) {
    this.resource = blockCollection;
    this.worldx = x;
    this.worldy = y;
    this.map = [];
    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 4; j++) {
        row.push(new Block(map[i][j]))
      }
      this.map.push(row);
    }
  }
  
  worldx: number;
  worldy: number;
  // map: Array<Array<Array<number>>>;
  map: Array<Array<Block>>;
  resource: VoxResource;
  
  draw(renderer: Canvas2dRenderer, x: number, y: number) {
    // console.log(this.resource.blockCollection);
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        this.map[i][j].draw(renderer, x + j * 30, y + i * 30, this.resource);
      }
    }
  }

  drawBoundary(renderer: Canvas2dRenderer, x: number, y: number) {
    let color='rgba(0,0,0,0.3)'
    // renderer.drawLine(color,x,y,x+120,y) // not need due to repeat drawing
    // renderer.drawLine(color,x,y,x,y+120)
    renderer.drawLine(color,x+120,y+120,x+120,y)
    renderer.drawLine(color,x+120,y+120,x,y+120)
  }


}