/* @flow */
import {checkArg, Decimal} from './decimal'
import {Millisecond} from './millisecond'
import {Minute} from './minute'

export class Second {
  n: Decimal

  static fromDecimal(n: Decimal): Second {
    return new Second(n.toNumber())
  }

  static fromMillisecond(n: Millisecond): Second {
    return new Second(n.div(1000).toNumber())
  }

  constructor(n: number) {
    checkArg(n)
    this.n = new Decimal(n)
  }

  toNumber() {
    return this.n.toNumber()
  }

  toMinute(): Minute {
    return Minute.fromSecond(this)
  }

  plus(v: number | Decimal): Second {
    return Second.fromDecimal(this.n.plus(v))
  }

  minus(v: number | Decimal): Second {
    return Second.fromDecimal(this.n.minus(v))
  }

  times(v: number | Decimal): Second {
    return Second.fromDecimal(this.n.times(v))
  }

  div(v: number | Decimal): Second {
    return Second.fromDecimal(this.n.div(v))
  }
}
