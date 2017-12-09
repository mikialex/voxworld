import { IEventhandleable } from "../interface/IEventhandleable";
import { EventDispatcher } from "./event-dispatcher";
import { VoxEvent } from "./event";
import { eventNames } from "cluster";

export class ReactiveBase implements IEventhandleable {
  constructor() {
      this.eventDispatcher = new EventDispatcher(this);
  }
  
  on(eventName:string,action:any) {
    this.eventDispatcher.on(eventName,action)
  }

  off(eventName:string,action:any) {
    this.eventDispatcher.off(eventName,action)
  }

  emit(eventName: string, event?: VoxEvent<any>) {
    this.eventDispatcher.emit(eventName,event);
  }
  
  eventDispatcher:EventDispatcher
}