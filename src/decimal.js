/* @flow */
import {errorPrefix} from './main'

const checkArgDefaultMessage = `${errorPrefix}The argument is 0 or a positive number`
const divErrorMessage        = `${errorPrefix}The argument is a positive number`
const divisionByZeroMessage  = `${errorPrefix}Division by zero`

export const checkArg = (n: number | Decimal, message?: string = checkArgDefaultMessage) => {
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
  n: number | Decimal

  constructor(n: number | Decimal) {
    checkArg(n)
    this.n = n
  }

  toNumber(): number {
    return unifyNumber(this.n)
  }

  plus(_v: number | Decimal): Decimal {
    checkArg(_v)
    const [n, v] = [unifyNumber(this.n), unifyNumber(_v)]
    return new Decimal(n + v)
  }

  minus(_v: number | Decimal): Decimal {
    checkArg(_v)
    const [n, v] = [unifyNumber(this.n), unifyNumber(_v)]

    return n < v
      ? new Decimal(0)
      : new Decimal(subtract(n, v))
  }

  times(_v: number | Decimal): Decimal {
    checkArg(_v)
    const [n, v] = [unifyNumber(this.n), unifyNumber(_v)]
    return new Decimal(multiply(n, v))
  }

  div(_v: number | Decimal): Decimal {
    checkArg(_v, divErrorMessage)
    const [n, v] = [unifyNumber(this.n), unifyNumber(_v)]

    if (v === 0) {
      throw new Error(divisionByZeroMessage)
    }

    return new Decimal(n / v)
  }
}
