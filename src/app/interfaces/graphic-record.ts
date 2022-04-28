export interface GraphicRecord {
  Time: Date;
  Bldgs: {[id: string]: number},
  EVs: {[id: string]: number},
  drOn: number,
  Total: number
  
}
