import { IDrawable } from "../../interface/IDrawable";
import { Canvas2dRenderer } from "../../renderer/canvas2d-renderer";

export abstract class BlockBase implements IDrawable {
  constructor(name:string,option:any) {
    this.name = name;
  }

  name: string;
  option: any;

  blockWidth: number = 30;
  renderHeight: number = 20;

  abstract draw(renderer: Canvas2dRenderer, x: number, y: number): void; 
  
}