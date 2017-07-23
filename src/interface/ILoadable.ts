
export interface ILoadable {
  load():Promise<any>; 

  // onprogress: (e: any) => void;
  // oncomplete: () => void;
  // onerror: (e: any) => void;

  hasLoaded: boolean;
}