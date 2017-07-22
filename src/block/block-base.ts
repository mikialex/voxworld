import { IDrawable } from "../interface/IDrawable";
import { Canvas2dRenderer } from "../renderer/canvas2d-renderer";

export abstract class Block implements IDrawable {
  constructor(name:string) {
    this.name = name;
  }
  name: string;
  blockWidth: number = 30;
  renderHeight: number = 20;

  abstract draw(renderer: Canvas2dRenderer, x: number, y: number): void;
  
}