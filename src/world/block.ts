import { IDrawable } from "../interface/IDrawable";
import { Canvas2dRenderer } from "../renderer/canvas2d-renderer";
import { VoxResource } from "../resource/resource-manage";
import { Sector } from "./sector";
import { ReactiveBase } from "../core/reactive-base";
import { VoxGame } from "../core/vox-game";
import { BoundingBox } from "../player/player";
import { VoxEvent } from "../core/event";

export const blockWidth = 30;//120/4

export class Block extends ReactiveBase implements IDrawable {
  constructor(typeId: number, game: VoxGame, sectorIndexX: number, sectorIndexY: number, sector: Sector) {
    super(game);
    this.type = typeId;
    this.game = game;
    this.resource = game.world.resource;
    this.sectorIndexX = sectorIndexX;
    this.sectorIndexY = sectorIndexY;
    this.worldX = sector.worldX + sectorIndexX * blockWidth;
    this.worldY = sector.worldY + sectorIndexY * blockWidth;
    this.sector = sector;
    this.on('click', this.test);
    this.on('passby', this.testPass);
  }

  test() {
    console.log('clicked')
    console.log(this.worldX, this.worldY);
    // if (this.type !== 0) {
    //   this.type = 0;
    // } else {
    //   this.type = 2;
    // }
  }

  testPass() {
    this.state.isPassingBy = true;
  }

  state: any = {
    isPassingBy: false,
  };
  type: number;
  game: VoxGame;
  resource: VoxResource;
  screenx: number;
  screeny: number;
  sector: Sector;
  sectorIndexX: number;
  sectorIndexY: number;
  worldX: number;
  worldY: number;

  get boundSquare() {
    return {
      leftTop: { x: this.worldX, y: this.worldY },
      leftBottom: { x: this.worldX, y: this.worldY + 30 },
      rightTop: { x: this.worldX + 30, y: this.worldY },
      rightBottom: { x: this.worldX + 30, y: this.worldY + 30 },
    }
  }


  public testObjectCollision(bbox: BoundingBox) {
    const outMinX = bbox.leftTop.x;
    const outMaxX = bbox.rightTop.x;
    const outMinY = bbox.leftTop.y;
    const outMaxY = bbox.rightBottom.y;

    const selfMinX = this.boundSquare.leftTop.x;
    const selfMaxX = this.boundSquare.rightTop.x;
    const selfMinY = this.boundSquare.leftTop.y;
    const selfMaxY = this.boundSquare.rightBottom.y;

    if (outMinX <= selfMaxX && outMaxX >= selfMinX
      && outMinY <= selfMaxY && outMaxY >= selfMinY) { //intersected
      if (this.type == 0) {                            //collision
        console.log(this.sectorIndexX, this.sectorIndexY);
        console.log(this.sector);
        let a = 1;
        for (let index = 0; index < 30000000; index++) {
          a++;
        }
        console.log(a);
        // this.emit('collison', new VoxEvent('passby', this));
        // return true;
        return false;
      } else {                                         //not need collison
        this.emit('passby', new VoxEvent('passby', this));
        return false
      }
    } else {                                         //not intersected
      return false;
    }
  }

  draw(renderer: Canvas2dRenderer, x: number, y: number) {
    this.screenx = x;
    this.screeny = y;
    if (this.type !== 0) {
      this.resource.blockCollection.collection[this.type]
        .draw(renderer, x, y, this.state);
    }
  }

  pointTest(x: number, y: number) {
    return x >= this.screenx && x < (this.screenx + blockWidth) && y >= this.screeny && y < (this.screeny + blockWidth)
  }

  testClick(x: number, y: number) {
    if (this.pointTest(x, y)) {
      this.emit('click');
    }
  }

}