/* @flow */
import {Decimal} from './decimal'

export class Millisecond extends Decimal {
  constructor(n: number) {
    super(n)
  }

  toSecondNumber(): number {
    return this.div(1000).toNumber()
  }
}
