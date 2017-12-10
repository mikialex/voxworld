import { IEventhandleable } from "../interface/IEventhandleable";
import { EventDispatcher } from "./event-dispatcher";
import { VoxEvent } from "./event";
import { eventNames } from "cluster";
import { InputHandler } from "./input-handler";
import { VoxGame } from "./vox-game";

export abstract class ReactiveBase implements IEventhandleable {
  constructor(game?:VoxGame) {
    this.eventDispatcher = new EventDispatcher(this);
    if (game) {
      this.centerInputHandler = game.inputHandler;
      this.centerInputHandler.addReactiveBase(this);
    }
  }
  centerInputHandler: InputHandler;
  eventDispatcher:EventDispatcher

  // addBaseToCenterInputHandler(base:ReactiveBase) {
  //   this.centerInputHandler.addReactiveBase(base);
  // }
  
  on(eventName: string, action: any) {
    if (eventName === 'keydown') {
      this.centerInputHandler.on(eventName, action);
    } else {
      this.eventDispatcher.on(eventName,action)
    }
  }

  off(eventName: string, action: any) {
    if (eventName === 'keydown') {
      this.centerInputHandler.off(eventName, action);
    } else {
      this.eventDispatcher.off(eventName,action)
    }
  }

  emit(eventName: string, event?: VoxEvent<any>) {
    if (eventName === 'keydown') {
      this.centerInputHandler.emit(eventName, event);
    } else {
      this.eventDispatcher.emit(eventName, event);
    }  
  }

  abstract pointTest(x: number, y: number): boolean;
  
}