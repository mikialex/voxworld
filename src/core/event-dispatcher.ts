import { VoxEvent } from "./event";

export class EventDispatcher {
  constructor(target: any) {
    this.target = target;
  }

  eventHandlers: { [key: string]: { (event?: VoxEvent<any>): void }[]; }
  target: any;  


  emit(eventName: string, event?: VoxEvent<any>) {
    console.log('event' + eventName + 'emit!')

    //if event is empty
    if (!event) {
         event = new VoxEvent();
      }
    event.target = this.target;
    
    //if event is onlisten ,emit it
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach(action => {
        action.call(this.target, event);
      })
    }
  }

  
  on(eventName: string) {
    
  }

  off(eventName: string) {
    
  }

}