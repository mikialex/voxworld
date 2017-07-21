import { Canvas2dRenderer } from '../renderer/canvas2d-renderer'
import { ResourcePool } from '../resource-manage/resource-pool'
import { Player } from '../player'
import { World } from '../world/world'

import { BlockCollection } from '../block'

import {SimpleBlock} from '../block/simple-block'

export class VoxGame {
  constructor(renderer:Canvas2dRenderer,resource:ResourcePool,player:Player) {
    this.renderer = renderer;
    let blocks = new BlockCollection();
    let testblock = new SimpleBlock();
    blocks.addBlock(testblock);
    blocks.addBlock(testblock);
    // testblock.draw(this.renderer, 50, 50);

    let testWorld = new World(blocks);
    testWorld.draw(this.renderer,50,50);
  }

  renderer: Canvas2dRenderer;

}