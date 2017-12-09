import { Canvas2dRenderer } from './renderer/canvas2d-renderer'
// import { voxWorld } from './world/world'
// import { camera } from './camera/camera'

import { Player } from './player'
import { VoxGame } from './core/vox-game'
import { VoxResource } from "./resource/resource-manage";

import {voxMeta} from './assets/vox-meta'

console.log('vox world welcomed')


//load resourses
//resoure is kind of surface that can be changed by user
let voxResource = new VoxResource(voxMeta);

//set renderBankend and render element
let testCanvas = new Canvas2dRenderer(document.getElementById("canvas"),voxResource)

//load player info and setting
let player = new Player();

//initalize game
let game = new VoxGame(testCanvas, voxResource, player)

voxResource.load()
  .then(m => {
    game.draw();
  })

function startGame(){
  game.start();
}

function stopGame(){
  game.stop();
}

document.getElementById('start-game').addEventListener('click',
  startGame
)

document.getElementById('stop-game').addEventListener('click',
stopGame
)