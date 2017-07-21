import { SimpleBlock } from './simple-block'

export class BlockCollection{ 
  constructor(){
    this.collection = [];
  }
  collection: SimpleBlock[]
  
  addBlock(block:SimpleBlock) {
    this.collection.push(block)
  }

}