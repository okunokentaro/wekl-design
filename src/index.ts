class Second {

  constructor(public v: number) {
    //
  }

  toMin(): number {
    return this.v / 60
  }
}

const s = new Second(120)
console.log(s.toMin())
