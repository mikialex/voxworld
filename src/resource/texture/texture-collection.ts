import { Texture } from "./texture";

export class TextureCollection {
  constructor(metainfo: any) {
    this.metaInfo = metainfo;
    this.collection = [];
  }

  addTexture(texture:Texture) {
    this.collection.push(texture)
  }

  metaInfo: any;
  collection: Array<Texture>;

  hasAllLoaded: boolean = false;
}