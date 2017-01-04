/* @flow */
const errorPrefix = '[WeklError] '

const checkArgDefaultMessage = 'The argument is 0 or a positive number'
const checkArg = (n: number, message?: string = checkArgDefaultMessage) => {
  const expected = 0 <= n
    && !isNaN(n)
    && n !== undefined
    && n !== null
    && n !== Infinity
  if (!expected) {
    throw new Error(`${errorPrefix}${message}`)
  }
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
  return (intX * intY) / Math.pow(10, exponent);
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

  plus(v: number): Decimal {
    checkArg(v)
    return new Decimal(this.n + v)
  }

  minus(v: number): Decimal {
    checkArg(v)
    return this.n < v
      ? new Decimal(0)
      : new Decimal(subtract(this.n, v))
  }

  times(v: number): Decimal {
    checkArg(v)
    return new Decimal(multiply(this.n, v))
  }

  div(v: number): Decimal {
    checkArg(v, 'The argument is a positive number')
    if (v === 0) {
      throw new Error(`${errorPrefix}Division by zero`)
    }
    return new Decimal(this.n / v)
  }
}
