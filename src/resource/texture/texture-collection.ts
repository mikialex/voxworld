import { Texture } from "./texture";
import { ILoadable } from "../../interface/ILoadable";

export class TextureCollection implements ILoadable{
  constructor(metainfo: any) {
    this.metaInfo = metainfo;
    this.collection = [];
  }

  addTexture(texture:Texture) {
    this.collection.push(texture)
  }

  metaInfo: any;
  collection: Array<Texture>;

   load() {
    return new Promise(() => {

    })
  }

  hasLoaded: boolean = false;
}