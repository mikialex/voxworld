import { BlockCollection } from '../block'
import { Canvas2dRenderer } from '../renderer/canvas2d-renderer'
import { IDrawable } from "../interface/IDrawable";
import { Sector } from "./sector";

import { testmap } from '../assets/map/test-sectors'
import { VoxResource } from "../resource/resource-manage";

export class World {
  map: Array<Sector> = [];
  resource: VoxResource;
  constructor(voxResource: VoxResource) {
    this.resource = voxResource;
    this.initalizeWorld();
  }

  initalizeWorld() {
    this.resource.voxWorldMap.forEach((sec:any) => {
      let sector = new Sector(this.resource, sec.x, sec.y, sec.map);
      this.map.push(sector);
    })
  }

  draw(renderer: Canvas2dRenderer, x: number, y: number) {
    this.map.forEach(sec => {
      sec.draw(renderer, x + sec.worldx * 120, y + sec.worldy * 120);
    })
  }

  drawSectorBoundaries(renderer: Canvas2dRenderer, x: number, y: number) {
    this.map.forEach(sec => {
      sec.drawBoundary(renderer, x + sec.worldx * 120, y + sec.worldy * 120);
    })
  }

  drawWorldAxis(renderer: Canvas2dRenderer, x: number, y: number) {
    renderer.fillCircle('#222', x, y, 5);
    renderer.drawLine('#444444', x, y, 1000, y)
    renderer.drawLine('#444444', x, y, x, 1000)
  }
}