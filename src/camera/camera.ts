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



}