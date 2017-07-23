import { ILoadable } from "../../interface/ILoadable";

export class Texture implements ILoadable {
  constructor() {
    this.image = new Image();
    // this.image.src = '../../assets/grass1.png'
    // this.image.onload = () => {
    //   this.hasLoaded = true;
    // }
    this.load().then(mess => {
      
    })
  }

  load(){
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve("loadsuccess!"); 
      }, 250)
    })

  }

  hasLoaded: boolean = false;
  url: string = "";
  image: HTMLImageElement;
}