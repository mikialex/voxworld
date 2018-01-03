import { Canvas2dRenderer } from './renderer/canvas2d-renderer'
// import { voxWorld } from './world/world'
// import { camera } from './camera/camera'

import { Player } from './player/player'
import { VoxGame } from './core/vox-game'
import { VoxResource } from "./resource/resource-manage";

import {voxMeta} from './assets/vox-meta'
import { VoxEvent } from './core/event';

console.log('vox world welcomed')


//load resourses
//resoure is kind of surface that can be changed by user
let voxResource = new VoxResource(voxMeta);

//set renderBankend and render element
let testCanvas = new Canvas2dRenderer(document.getElementById("canvas"), voxResource)


function updateInfo(e:VoxEvent) {
  document.getElementById('frame-rate').innerText = e.payload.frameRate;
  document.getElementById('frame-rate-average').innerText = e.payload.averageFrameRate;
}

//initalize game
let game = new VoxGame(testCanvas, voxResource)
game.on('report', updateInfo);

//load player info and setting
let player = new Player(game);
game.addPlayer(player)

voxResource.load()
  .then(m => {
    game.draw();
  })

function startGame(){
  game.start();
  document.getElementById('canvas').focus();
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