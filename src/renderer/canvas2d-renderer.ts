import { IRenderable } from '../interface/IRenderable'
import { VoxResource } from "../resource/resource-manage";
import { Camera } from '../camera/camera';

interface renderTask {
  item: any;
  renderCallBack: any;
}

export class Canvas2dRenderer implements IRenderable {
  element: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  devicePixelRatio: number;
  width: number;
  height: number;

  resource: VoxResource;
  camera: Camera


  constructor(canvas: HTMLElement, resource: VoxResource, camera: Camera) {
    this.devicePixelRatio = window.devicePixelRatio || 1;
    this.element = <HTMLCanvasElement>canvas;
    this.ctx = this.element.getContext("2d");
    this.width = this.element.width;
    this.height = this.element.height;
    this.resource = resource;
    this.camera = camera;
  }
  render() {
    console.log('rendering')
  }

  private renderList: any = []
  pushRenderList(task: any) {

  }



  get screenLeftTopWorldX() {
    return this.camera.lookAtX - this.width / 2;
  }
  get screenLeftTopWorldY() {
    return this.camera.lookAtY - this.height / 2;
  }
  get screenRightBottomWorldX() {
    return this.camera.lookAtX + this.width / 2;
  }
  get screenRightBottomWorldY() {
    return this.camera.lookAtY + this.height / 2;
  }



  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  /**
  * Draws the sprite appropriately to the 2D rendering context.
  * @param screenX1    corner point of draw bbox x coordinate
  * @param screenY1    corner point of draw bbox y coordinate
  * @param screenX2    another-corner point of draw bbox x coordinate
  * @param screenY2    another-corner point of draw bbox y coordinate
  */
  isNeedDraw(screenX1: number, screenY1: number, screenX2: number, screenY2: number) {
    const minX = Math.min(screenX1, screenX2);
    const minY = Math.min(screenY1, screenY2);
    const maxX = Math.max(screenY1, screenY2);
    const maxY = Math.max(screenY1, screenY2);
    if (minX > this.width || maxX < 0
      || minY > this.height || maxY < 0) {
      return false
    } else {
      return true;
    }
  }

  drawLine(color: string, x1: number, y1: number, x2: number, y2: number) {
    if (this.isNeedDraw(x1, y1, x2, y2)) {
      this.ctx.strokeStyle = color;
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.closePath();
      this.ctx.stroke();
    }
  }

  fillRect(color: string, x: number, y: number, width: number, height: number) {
    if (this.isNeedDraw(x, y, x + width, y + height)) {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x, y, width, height)
    }
  }
  fillRectFromWorld(color: string, worldX: number, worldY: number, worldZ: number,
    width: number, height: number) {
    this.fillRect(color,
      this.camera.screenSpaceXTranstorm(worldX),
      this.camera.screenSpaceYTranstorm(worldY, worldZ),
      width, height
    )
  }

  fillCircle(color: string, screenX: number, screenY: number, r: number) {
    if (this.isNeedDraw(screenX - r, screenY - r, screenX + r, screenY + r)) {
      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      this.ctx.arc(screenX, screenY, r, 0, 2 * Math.PI, true);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }
  fillCircleFromWorld(color: string, worldX: number, worldY: number, worldZ: number, r: number) {
    this.fillCircle(color,
      this.camera.screenSpaceXTranstorm(worldX),
      this.camera.screenSpaceYTranstorm(worldY, worldZ),
      r
    )
  }

  paintRectTexture(texture: string, screenX: number, screenY: number, width: number, height: number) {
    if (this.isNeedDraw(screenX, screenY, screenX + width, screenY + height)) {
      this.ctx.drawImage(this.resource.textureCollection.collection[texture].image, screenX, screenY, width, height);
    }
  }
  paintRectTextureFromWorld(texture: string,
    worldX: number, worldY: number, worldZ: number,
    width: number, height: number) {
    this.paintRectTexture(texture,
      this.camera.screenSpaceXTranstorm(worldX),
      this.camera.screenSpaceYTranstorm(worldY, worldZ),
      width, height)
  }

}