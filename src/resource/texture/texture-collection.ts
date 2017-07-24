import { Texture } from "./texture";
import { ILoadable } from "../../interface/ILoadable";

export class TextureCollection implements ILoadable {
  constructor(metainfo: any) {
    this.metaInfo = metainfo;
    this.collection = [];

    this.metaInfo.forEach((textureConfig: any) => {
      this.addTexture(new Texture(textureConfig.name, '../../../src/assets/texture/block/'+textureConfig.url))
    });
  }

  addTexture(texture: Texture) {
    this.collection.push(texture)
  }

  metaInfo: any;
  collection: Array<Texture>;

  load() {
    let alltextureloader: Array<Promise<any>> = [];
    this.collection.forEach(texture => {
      alltextureloader.push(texture.load());
    })
    return Promise.all(alltextureloader)
      .then(m => {
        console.log(m);
      })
  }

  hasLoaded: boolean = false;
}