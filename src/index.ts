import { Canvas2dRenderer } from './renderer/canvas2d-renderer'
// import { voxWorld } from './world/world'
// import { camera } from './camera/camera'
import { ResourcePool } from './resource-manage/resource-pool'
import { Player } from './player'
import { VoxGame } from './core/vox-game'


console.log('vox world welcomed')

//set renderBankend and render element
let testCanvas = new Canvas2dRenderer(document.getElementById("canvas"))

//load resourses
//resoure is kind of surface that can be changed by user
let resourcePool = new ResourcePool();

//load player info and setting
let player = new Player();

//initalize game
let game = new VoxGame(testCanvas, resourcePool, player)

