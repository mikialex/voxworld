export class Camera {
  public lookAtX: number;
  public lookAtY: number;

  constructor() {
    this.lookAtX = 0;
    this.lookAtY = 0;
  }

  public lookAt(x: number, y: number) {
    this.lookAtX = x;
    this.lookAtY = y;
  }

  public screenSpaceXTranstorm(worldX: number) {
    return this.lookAtX + worldX;
  }

  public screenSpaceYTranstorm(worldY: number, worldZ: number) {
    return this.lookAtY + worldY - worldZ;
  }

  public worldSpaceXTranstorm(screenX: number) {
    return screenX - this.lookAtX;
  }

  public worldSpaceYTranstorm(screenX: number) {
    return screenX - this.lookAtY;
  }

}