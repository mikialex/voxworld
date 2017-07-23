import { IEventhandleable } from "../interface/IEventhandleable";
import { EventDispatcher } from "./event-dispatcher";

export class ReactiveBase implements IEventhandleable {
  constructor() {
      this.eventDispatcher = new EventDispatcher(this);
  }
  
  eventDispatcher:EventDispatcher
}