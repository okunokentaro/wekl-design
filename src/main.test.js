import test from 'ava'
import {Decimal} from '../src/main'

test('Can be instantiated', (t) => {
  t.is(!!new Decimal(1), true)
})

/**
 * Should throws
 */
const shouldThrowsTest = (cb) => {
  const pTest = (v, exp) => {
    test(`Should throw when given ${exp}`, (t) => {
      t.throws(() => cb(v))
    })
  }

  [
    [-1,        'negative number'],
    [undefined, 'undefined'],
    [null,      'null'],
    [NaN,       'NaN'],
    [Infinity,  'Infinity'],
    [-Infinity, '-Infinity'],
  ].forEach((args) => pTest.apply(undefined, args))
}

/**
 * Should throws
 */
shouldThrowsTest((v) => new Decimal(v))

/**
 * #toNumber()
 */
{
  test('Should works #toNumber()', (t) => {
    t.is(new Decimal(1).toNumber(), 1)
  })
}

/**
 * #plus()
 */
{
  const pTest = (a, b, expected) => {
    test(`Should works #plus(), ${a} + ${b}`,(t) => {
      const ms = new Decimal(a)
      t.is(ms.plus(b).toNumber(), expected)
    })
  }

  pTest(0, 0, 0)
  pTest(1, 0, 1)
  pTest(0, 1, 1)
  pTest(1, 1, 2)
  pTest(1, 0.99, 1.99)
  pTest(1, 6.1915, 7.1915)
  pTest(1, 0.09, 1.09)
  pTest(1, 8e5, 800001)
  pTest(1, 9E12, 9000000000001)
  pTest(1, 1e-14, 1.00000000000001)
  pTest(1, 3.345E-9, 1.000000003345)
  pTest(9.654, 0, 9.654)
  pTest(0, 0.001, 0.001)
  pTest(0, 111.1111111110000, 111.111111111)

  shouldThrowsTest((v) => new Decimal(1).plus(v))
}

/**
 * #minus()
 */
{
  const pTest = (a, b, expected) => {
    test(`Should works #minus(), ${a} - ${b}`,(t) => {
      const ms = new Decimal(a)
      t.is(ms.minus(b).toNumber(), expected)
    })
  }

  pTest(0, 0, 0)
  pTest(1, 0, 1)
  pTest(0, 1, 0)
  pTest(1, 1, 0)
  pTest(1, 2, 0)
  pTest(1, 0.99, 0.01)
  pTest(65.4, 3.21, 62.19)

  shouldThrowsTest((v) => new Decimal(1).minus(v))
}

/**
 * #times()
 */
{
  const pTest = (a, b, expected) => {
    test(`Should works #times(), ${a} * ${b}`,(t) => {
      const ms = new Decimal(a)
      t.is(ms.times(b).toNumber(), expected)
    })
  }

  pTest(0, 0, 0)
  pTest(1, 0, 0)
  pTest(0, 1, 0)
  pTest(1, 1, 1)
  pTest(1, 2, 2)
  pTest(2, 1, 2)
  pTest(1, 0.99, 0.99)
  pTest(2, 0.99, 1.98)
  pTest(65.4, 3.21, 209.934)

  shouldThrowsTest((v) => new Decimal(1).times(v))
}

/**
 * #div()
 */
{
  const pTest = (a, b, expected) => {
    test(`Should works #div(), ${a} / ${b}`,(t) => {
      const ms = new Decimal(a)
      t.is(ms.div(b).toNumber(), expected)
    })
  }

  pTest(0, 1, 0)
  pTest(1, 1, 1)
  pTest(1, 2, 0.5)
  pTest(2, 1, 2)
  pTest(1, 0.99, 1.0101010101010102)
  pTest(2, 0.99, 2.0202020202020203)
  pTest(65.4, 3.21, 20.373831775700936)

  shouldThrowsTest((v) => new Decimal(1).div(v))
  test('Should throw when given 0', (t) => {
    t.throws(() => new Decimal(1).div(0))
  })
}
