/* @flow */
import {checkArg, Decimal} from './decimal'
import {Second} from './second'

export class Minute {
  n: Decimal

  static fromDecimal(n: Decimal): Minute {
    return new Minute(n.toNumber())
  }

  static fromSecond(n: Second): Minute {
    return new Minute(n.div(60).toNumber())
  }

  constructor(n: number) {
    checkArg(n)
    this.n = new Decimal(n)
  }

  toNumber() {
    return this.n.toNumber()
  }

  plus(v: number | Decimal): Minute {
    return Minute.fromDecimal(this.n.plus(v))
  }

  minus(v: number | Decimal): Minute {
    return Minute.fromDecimal(this.n.minus(v))
  }

  times(v: number | Decimal): Minute {
    return Minute.fromDecimal(this.n.times(v))
  }

  div(v: number | Decimal): Minute {
    return Minute.fromDecimal(this.n.div(v))
  }
}
