import { ILoadable } from "../../interface/ILoadable";

export class Texture implements ILoadable {
  constructor(name: string, url: string) {
    this.image = new Image();
    this.name = name;
    this.url = url;
    // this.load().then(mess => {
    //   console.log(mess)
    // })
  }

  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.image.onload = () => {
        this.hasLoaded = true;
        resolve("loadsuccess!");
      }
      this.image.onerror = () => {
        this.hasLoaded = true;
        reject("load error!");
      }
      this.image.src = this.url;
    })

  }


  hasLoaded: boolean = false;

  name: string;
  url: string = "";
  image: HTMLImageElement;
}