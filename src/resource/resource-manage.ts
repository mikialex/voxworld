import { TextureCollection } from "./texture/texture-collection";
import { BlockCollection } from "./block/block-collection";
import { SolidBlock } from "./block/solid-block";


export class VoxResource {
  constructor(voxMetaInfo: any) {
    console.info('metaInfo:',voxMetaInfo);
    this.voxMetaInfo = voxMetaInfo;
    this.initalizeBlockCollection();

    this.textureCollection=new TextureCollection(voxMetaInfo.blockTextureMetaInfo)
  }

  initalizeBlockCollection() {
    let blocks = new BlockCollection();
    let voidBlock = new SolidBlock('void', {});
    blocks.addBlock(voidBlock);
    this.voxMetaInfo.blockMetaInfo.forEach((blockConfig: any) => {
      let block;
      switch (blockConfig.type) {
        case 'solid':
          block = new SolidBlock(blockConfig.name, blockConfig.option);
          break;

        default:
          break;
      }
      blocks.addBlock(block);
    });
    this.blockCollection = blocks;
  }

 /**
 * store the meta object of game metainfo, which defined in assets/vox-meta.
 */
  voxMetaInfo: any;

  textureCollection: TextureCollection;
  blockCollection: BlockCollection;

}