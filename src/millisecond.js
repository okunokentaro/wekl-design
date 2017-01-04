/* @flow */
import {checkArg, Decimal} from './decimal'
import {Second} from './second'
import {Minute} from './minute'

interface Hoge {
  foo(): void
}

export class Millisecond {
  n: Decimal

  static fromDecimal(n: Decimal): Millisecond {
    return new Millisecond(n.toNumber())
  }

  constructor(n: number) {
    checkArg(n)
    this.n = new Decimal(n)
  }

  toNumber() {
    return this.n.toNumber()
  }

  toSecond(): Second {
    return Second.fromMillisecond(this)
  }

  toMinute(): Minute {
    return Minute.fromSecond(this.toSecond())
  }

  plus(v: number | Decimal): Millisecond {
    return Millisecond.fromDecimal(this.n.plus(v))
  }

  minus(v: number | Decimal): Millisecond {
    return Millisecond.fromDecimal(this.n.minus(v))
  }

  times(v: number | Decimal): Millisecond {
    return Millisecond.fromDecimal(this.n.times(v))
  }

  div(v: number | Decimal): Millisecond {
    return Millisecond.fromDecimal(this.n.div(v))
  }
}
