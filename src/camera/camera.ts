export class Camera {
  lookAtX: number;
  lookAtY: number;

  constructor() {
    this.lookAtX = 0;
    this.lookAtY = 0;
  }

  lookAt(x: number, y: number) {
    this.lookAtX = x;
    this.lookAtY = y;
  }


}