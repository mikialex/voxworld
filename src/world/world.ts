import { BlockCollection } from '../block'
import { Canvas2dRenderer } from 'renderer/canvas2d-renderer'
import { IDrawable } from "interface/IDrawable";

export class Sector implements IDrawable{
  worldx: number;
  worldy: number;
  sectorWidth:number= 4;
  // map: Array<Array<Array<number>>>;
  map: Array<Array<number>>;
  blockCollection: BlockCollection;
  constructor(blockCollection:BlockCollection) {
    this.blockCollection=blockCollection
    this.map = [
      [1, 0, 0, 1],
      [1, 1, 1, 1],
      [1, 0, 1, 1],
      [1, 0, 0, 1]]
  }
  
  draw(renderer: Canvas2dRenderer, x: number, y: number) {
    // this.map.forEach(row => {
    //   row.forEach(block => {
    //     // this.blockCollection.collection[block].draw()
    //     console.log('draw block')
    //   })
    // })
    for (let i = 0; i < this.sectorWidth; i++){
      for (let j = 0; j < this.sectorWidth; j++){
        if (this.map[i][j] !== 0) {
          let block = this.blockCollection.collection[this.map[i][j]];
          block.draw(renderer, x + j * block.blockWidth, y + i * block.blockWidth);
        }
      }
    }

  }

  /**
   * setBlock
   */
  public setBlock() {

  }

  public exportSector() {

  }

}

// let testWorlds=[
//   []
// ]

export class World {
  map: Array<Sector>;
  blockCollection: BlockCollection;
  constructor(blockCollection: BlockCollection) {
    this.map = [];
    this.blockCollection = blockCollection;
    let sectorTest = new Sector(this.blockCollection);
    this.map.push(sectorTest)
  }

  draw(renderer: Canvas2dRenderer, x: number, y: number) {
    this.map.forEach(sec => {
      console.log('draw sector')
      sec.draw(renderer, x, y)
    })
  }
}