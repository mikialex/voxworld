import { BlockCollection } from '../block'
import { Canvas2dRenderer } from '../renderer/canvas2d-renderer'
import { IDrawable } from "../interface/IDrawable";
import { VoxResource } from "../resource/resource-manage";


export class Sector implements IDrawable{
  constructor(blockCollection:VoxResource,x:number,y:number,map:Array<Array<number>>) {
    this.resource = blockCollection;
    this.worldx = x;
    this.worldy = y;
    this.map = map;
  }
  
  worldx: number;
  worldy: number;
  sectorWidth:number= 4;
  // map: Array<Array<Array<number>>>;
  map: Array<Array<number>>;
  resource: VoxResource;
  
  draw(renderer: Canvas2dRenderer, x: number, y: number) {
    // console.log(this.resource.blockCollection);
    for (let i = 0; i < this.sectorWidth; i++) {
      for (let j = 0; j < this.sectorWidth; j++) {
        if (this.map[i][j] !== 0) { // 0 represent void block
          let block = this.resource.blockCollection.collection[this.map[i][j]];
          block.draw(renderer, x + j * block.blockWidth, y + i * block.blockWidth);
        }
      }
    }
  }

  drawBoundary(renderer: Canvas2dRenderer, x: number, y: number) {
    let color='rgba(0,0,0,0.3)'
    // renderer.drawLine(color,x,y,x+this.sectorWidth*30,y) // not need due to repeat drawing
    // renderer.drawLine(color,x,y,x,y+this.sectorWidth*30)
    renderer.drawLine(color,x+this.sectorWidth*30,y+this.sectorWidth*30,x+this.sectorWidth*30,y)
    renderer.drawLine(color,x+this.sectorWidth*30,y+this.sectorWidth*30,x,y+this.sectorWidth*30)
  }

  /**
   * setBlock
   */
  public setBlock() {

  }

  public exportSector() {

  }

}