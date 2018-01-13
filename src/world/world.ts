import { Canvas2dRenderer } from '../renderer/canvas2d-renderer'
import { IDrawable } from "../interface/IDrawable";
import { Sector } from "./sector";

import { testmap } from '../assets/map/test-sectors'
import { VoxResource } from "../resource/resource-manage";
import { sectorWidth } from './sector'
import { ReactiveBase } from '../core/reactive-base';
import { VoxGame } from '../core/vox-game';
import { BoundingBox } from '../player/player';

export class World extends ReactiveBase implements IDrawable {
  map: Array<Sector> = [];
  game: VoxGame;
  resource: VoxResource;
  screenx: number;
  screeny: number;
  worldX = 0;
  worldY = 0;
  worldZ = 0;


  constructor(game: VoxGame, resource: VoxResource) {
    super(game);
    this.game = game;
    this.resource = resource;
  }

  initalizeWorld() {
    this.resource.voxMetaInfo.voxWorldMap.forEach((sec: any) => {
      let sector = new Sector(this.game, sec.x, sec.y, sec.map);
      this.map.push(sector);
    })
  }

  draw(renderer: Canvas2dRenderer, x: number, y: number) {
    this.screenx = x;
    this.screeny = y;
    this.map.forEach(sec => {
      sec.draw(renderer, x + sec.worldIndexX * sectorWidth, y + sec.worldIndexY * sectorWidth);
    })
  }
  drawW() {
    this.map.forEach(sec => {
      sec.drawW();
    })
  }
  pushRenderer(renderer: Canvas2dRenderer) {
    this.map.forEach(sec => {
      sec.pushRenderer(renderer);
    })
  }

  public testObjectCollision(object: any, isJustTest: boolean) {
    let ret = false;
    this.map.forEach((sector) => {
      if (sector.testObjectCollision(object, isJustTest)) {
        ret = true;
      }
    })
    return ret;
  }

  pointTest(x: number, y: number) {
    return x >= this.screenx && x < (this.screenx + sectorWidth * 3) && y >= this.screeny && y < (this.screeny + sectorWidth * 3)
  }

  testClick(x: number, y: number) {
    if (this.pointTest(x, y)) {
      this.emit('click');
    }
    this.map.forEach((sector) => {
      sector.testClick(x, y);
    })
  }

  drawSectorBoundaries(renderer: Canvas2dRenderer, x: number, y: number) {
    this.map.forEach(sec => {
      sec.drawBoundary(renderer, x + sec.worldIndexX * sectorWidth, y + sec.worldIndexY * sectorWidth);
    })
  }

  drawWorldAxis(renderer: Canvas2dRenderer, x: number, y: number) {
    renderer.fillCircle('#222', x, y, 5);
    renderer.drawLine('#444444', x, y, 1000, y);
    renderer.drawLine('#444444', x, y, x, 1000);
  }
}