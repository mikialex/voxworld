import { TextureCollection } from "./texture/texture-collection";
import { BlockCollection } from "./block/block-collection";
import { ILoadable } from "../interface/ILoadable";


export class VoxResource implements ILoadable {
  constructor(voxMetaInfo: any) {
    console.info('metaInfo:', voxMetaInfo);
    this.voxMetaInfo = voxMetaInfo;
    this.textureCollection = new TextureCollection(voxMetaInfo.blockTextureMetaInfo)
    this.blockCollection = new BlockCollection(voxMetaInfo.blockMetaInfo)
  }

  /**
  * store the meta object of game metainfo, which defined in assets/vox-meta.
  */
  voxMetaInfo: any;

  load() {
    return new Promise(() => {

    })
  }

  hasLoaded: boolean;

  textureCollection: TextureCollection;
  blockCollection: BlockCollection;

}