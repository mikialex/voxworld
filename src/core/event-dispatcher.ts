import { VoxEvent } from "./event";

interface eventAction{
  
}

export class EventDispatcher {
  constructor(target: any) {
    this.target = target;
    this.eventHandlers = {};
  }

  // eventHandlers: { [key: string]: { (event?: VoxEvent<any>): void }[]; }
  eventHandlers: { [key: string]: Array<any> }
  target: any;  


  emit(eventName: string, event?: VoxEvent) {
    // console.log('event ' + eventName + ' emit!')

    //if event is empty
    if (!event) {
         event = new VoxEvent(eventName);
      }
    event.target = this.target;
    
    //if event is onlisten ,emit it
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach(action => {
        action.call(this.target, event);
      })
    }
  }

  on(eventName: string, action: any) {
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].push(action);
    } else {
      this.eventHandlers[eventName] = [];
      this.eventHandlers[eventName].push(action);
    }
  }

  off(eventName: string,action:any) {
    this.eventHandlers[eventName] = this.eventHandlers[eventName].filter((actionitem) => {
      return actionitem !== action;
    })
  }



}