/* @flow */
import {errorPrefix} from './main'

const checkArgDefaultMessage = `${errorPrefix}The argument is 0 or a positive number`
const divErrorMessage        = `${errorPrefix}The argument is a positive number`
const divisionByZeroMessage  = `${errorPrefix}Division by zero`

const checkArg = (n: number | Decimal, message?: string = checkArgDefaultMessage) => {
  if (n instanceof Decimal) {
    return
  }

  const expected = 0 <= n
    && !isNaN(n)
    && n !== undefined
    && n !== null
    && n !== Infinity
  if (!expected) {
    throw new Error(`${message}`)
  }
}

const unifyNumber = (n: number | Decimal): number => {
  return n instanceof Decimal
    ? n.toNumber()
    : n
}

const getExponent = (v: number) => {
  const list = v.toString().split('.')
  return list[1] !== undefined
    ? list[1].length
    : 0
}

const multiply = (x: number, y: number) => {
  const intX = parseInt(x.toString().replace('.', ''), 10)
  const intY = parseInt(y.toString().replace('.', ''), 10)
  const exponent = getExponent(x) + getExponent(y)
  return (intX * intY) / Math.pow(10, exponent)
}

const subtract = (x: number, y: number) => {
  const max = Math.max(getExponent(x), getExponent(y))
  const k = Math.pow(10, max)
  return (multiply(x, k) - multiply(y, k)) / k
}

export class Decimal {
  n: number

  constructor(n: number) {
    checkArg(n)
    this.n = n
  }

  toNumber(): number {
    return this.n
  }

  plus(v: number | Decimal): Decimal {
    checkArg(v)
    const numV = unifyNumber(v)
    return new Decimal(this.n + numV)
  }

  minus(v: number | Decimal): Decimal {
    checkArg(v)
    const numV = unifyNumber(v)

    return this.n < numV
      ? new Decimal(0)
      : new Decimal(subtract(this.n, numV))
  }

  times(v: number): Decimal {
    checkArg(v)
    const numV = unifyNumber(v)

    return new Decimal(multiply(this.n, numV))
  }

  div(v: number): Decimal {
    checkArg(v, divErrorMessage)
    const numV = unifyNumber(v)

    if (numV === 0) {
      throw new Error(divisionByZeroMessage)
    }
    return new Decimal(this.n / numV)
  }
}
