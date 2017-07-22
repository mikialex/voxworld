import { Block } from "./block-base";

export class BlockCollection{
  constructor(){
    this.collection = [];
  }
  collection: Block[]
  
  addBlock(block:Block) {
    this.collection.push(block)
  }

}