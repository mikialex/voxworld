import { SolidBlock } from '../block/solid-block'
import { BlockCollection } from "../block/index";


export class VoxResource {
  constructor(voxMetaInfo: any) {
    this.voxMetaInfo = voxMetaInfo;
    this.voxWorldMap = voxMetaInfo.voxWorldMap;
    this.initalizeBlockCollection();

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
    console.log(this.blockCollection)
  }

  voxMetaInfo: any;
  voxWorldMap: any;

  blockCollection: BlockCollection;

}