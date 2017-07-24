import { BlockBase } from "./block-base";
import { SolidBlock } from "./solid-block";
import { TextureSolidBlock } from "./texture-solid-block";

export class BlockCollection {
  constructor(metaInfo: any) {
    this.metaInfo = metaInfo;
    this.collection = [];

    let voidBlock = new SolidBlock('void', {});
    this.addBlock(voidBlock);

    metaInfo.forEach((blockConfig: any) => {
      let block;
      switch (blockConfig.type) {
        case 'solid':
          block = new SolidBlock(blockConfig.name, blockConfig.option);
          break;
        case 'textureSolid':
          block = new TextureSolidBlock(blockConfig.name, blockConfig.option);
          break;
        default:
          break;
      }
      this.addBlock(block);
    });

  }

  metaInfo: any;
  collection: BlockBase[]

  addBlock(block: BlockBase) {
    this.collection.push(block)
  }

}