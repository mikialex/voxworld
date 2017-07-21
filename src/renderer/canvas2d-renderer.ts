interface squareFace{
  x1: number;y1: number;x2: number;y2: number;
  x3: number;y3: number;x4: number;y4: number;
}

export class Canvas2dRenderer {
  element: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  devicePixelRatio: number;
  constructor(canvas: HTMLElement) {
    this.devicePixelRatio = window.devicePixelRatio || 1;
    this.element = <HTMLCanvasElement>canvas;
    this.ctx = this.element.getContext("2d");

    this.render();
    this.drawFace('#123345', { x1: 123, y1: 23, x2: 12, y2: 234, x3: 32, y3: 12, x4: 12, y4: 3 });
    // this.raf();

  }
  render() {
    console.log('rendering')
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(10.5, 10, 100, 100);
    let image = new Image();
    image.src = '/src/assets/grass1.png';
    image.onload =  ()=> {
      this.ctx.drawImage(image,0,0);
    }

  }

  raf() {
    console.log('d')
    requestAnimationFrame(this.raf);
  }

  drawBlock(){
    
  }

  drawFace(color:string,points:squareFace) {
    this.ctx.fillStyle = color;
    console.log('rendering')
    this.ctx.beginPath();
    this.ctx.moveTo(points.x1,points.y1);
    this.ctx.lineTo(points.x2,points.y2);
    this.ctx.lineTo(points.x3,points.y3);
    this.ctx.lineTo(points.x4,points.y4);
    this.ctx.fill();
  }
  drawLine() {
    
  }

}