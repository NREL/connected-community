export interface Record {
  Time: Date;
  Bldgs: {
    [id: string]: number
  },
  Total: number
}
