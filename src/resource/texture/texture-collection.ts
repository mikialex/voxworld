import { Texture } from "./texture";
import { ILoadable } from "../../interface/ILoadable";

const textBase = '../../../src/assets/texture/block/'

export class TextureCollection implements ILoadable {
  constructor(metainfo: any) {
    this.metaInfo = metainfo;
    this.collection = {};
    console.log(metainfo);
    for (const textureConfigName in this.metaInfo) {
      const textureConfig = this.metaInfo[textureConfigName];
      this.addTexture(new Texture(textureConfig.name, textBase + textureConfig.url));
    }
  }

  addTexture(texture: Texture) {
    this.collection[texture.name] = texture;
  }

  metaInfo: any;
  collection: { [index: string]: Texture };

  load() {
    let alltextureloader: Array<Promise<any>> = [];
    for (const texture in this.collection) {
      alltextureloader.push(this.collection[texture].load());
    }
    return Promise.all(alltextureloader)
      .then(m => {
        console.log(m);
      })
  }

  hasLoaded: boolean = false;
}