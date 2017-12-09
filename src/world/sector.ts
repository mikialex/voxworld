import { BlockCollection } from '../resource/block/block-collection'
import { Canvas2dRenderer } from '../renderer/canvas2d-renderer'
import { IDrawable } from "../interface/IDrawable";
import { VoxResource } from "../resource/resource-manage";
import { Block } from "./block";
import { ReactiveBase } from '../core/reactive-base';
import { VoxGame } from '../core/vox-game';

export const sectorWidth = 120;
const sectorCount = 4;
export const blockWidth = 30;//120/4

export class Sector extends ReactiveBase implements IDrawable{
  constructor(game: VoxGame, x: number, y: number, map: Array<Array<number>>) {
    super(game);
    this.game = game;
    this.resource = game.world.resource;
    this.worldx = x;
    this.worldy = y;
    this.map = [];
    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 4; j++) {
        row.push(new Block(map[i][j],game))
      }
      this.map.push(row);
    }
  }
  
  worldx: number;
  worldy: number;
  screenx: number;
  screeny: number;
  // map: Array<Array<Array<number>>>;
  map: Array<Array<Block>>;
  game: VoxGame;
  resource: VoxResource;

  get id() {
    return this.worldx + ' ' + this.worldy;
  }
  
  draw(renderer: Canvas2dRenderer, x: number, y: number) {
    this.screenx = x;
    this.screeny = y;
    for (let i = 0; i < sectorCount; i++) {
      for (let j = 0; j < sectorCount; j++) {
        this.map[i][j].draw(renderer, x + j * blockWidth, y + i * blockWidth);
      }
    }
  }

  pointTest(x:number,y:number) {
    return x >= this.screenx && x < (this.screenx + sectorWidth) && y >= this.screeny && y < (this.screeny + sectorWidth)
  }

  testClick(x: number,y:number) {
    if (this.pointTest(x, y)) {
      this.emit('click');
    }
    for (let i = 0; i < sectorCount; i++) {
      for (let j = 0; j < sectorCount; j++) {
        this.map[i][j].testClick(x,y)
      }
    }
  }


  drawBoundary(renderer: Canvas2dRenderer, x: number, y: number) {
    let color='rgba(0,0,0,0.3)'
    // renderer.drawLine(color,x,y,x+120,y) // not need due to repeat drawing
    // renderer.drawLine(color,x,y,x,y+120)
    renderer.drawLine(color,x+sectorWidth,y+sectorWidth,x+sectorWidth,y)
    renderer.drawLine(color,x+sectorWidth,y+sectorWidth,x,y+sectorWidth)
  }


}