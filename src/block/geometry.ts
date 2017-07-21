export class blockGeometry{
  id: number;
  map: Array<Array<Array<boolean>>>;
  color:string;
  constructor(){

  }
}

export class blockGeometryCollection{
  collection:blockGeometry[]
  constructor(){ 

  }

  addGeomometry(newGeomometry:blockGeometry){
    this.collection.push(newGeomometry)
  }

}