import { Canvas2dRenderer } from '../renderer/canvas2d-renderer'
import { IDrawable } from "../interface/IDrawable";
import { Sector } from "./sector";

import { testmap } from '../assets/map/test-sectors'
import { VoxResource } from "../resource/resource-manage";
import {sectorWidth} from './sector'
import { ReactiveBase } from '../core/reactive-base';

export class World extends ReactiveBase implements IDrawable{
  map: Array<Sector> = [];
  resource: VoxResource;
  screenx: number;
  screeny: number;

  constructor(voxResource: VoxResource) {
    super();
    this.resource = voxResource;
    this.initalizeWorld();
  }

  initalizeWorld() {
    this.resource.voxMetaInfo.voxWorldMap.forEach((sec:any) => {
      let sector = new Sector(this.resource, sec.x, sec.y, sec.map);
      this.map.push(sector);
    })
  }

  draw(renderer: Canvas2dRenderer, x: number, y: number) {
    this.screenx = x;
    this.screeny = y;
    this.map.forEach(sec => {
      sec.draw(renderer, x + sec.worldx * sectorWidth, y + sec.worldy * sectorWidth);
    })
  }

  pointTest(x: number, y: number) {
    return x >= this.screenx && x < (this.screenx + sectorWidth*3) && y >= this.screeny && y < (this.screeny + sectorWidth*3)
  }

  testClick(x: number,y:number) {
    if (this.pointTest(x, y)) {
      this.emit('click');
    }
    this.map.forEach((sector) => {
      sector.testClick(x,y);
    })
  }

  drawSectorBoundaries(renderer: Canvas2dRenderer, x: number, y: number) {
    this.map.forEach(sec => {
      sec.drawBoundary(renderer, x + sec.worldx * sectorWidth, y + sec.worldy * sectorWidth);
    })
  }

  drawWorldAxis(renderer: Canvas2dRenderer, x: number, y: number) {
    renderer.fillCircle('#222', x, y, 5);
    renderer.drawLine('#444444', x, y, 1000, y);
    renderer.drawLine('#444444', x, y, x, 1000);
  }
}