import test from 'ava'
import {Millisecond} from './millisecond'
import {Decimal} from './decimal'

/**
 * Should throws
 */
test('Should throws', (t) => {
  t.throws(() => new Millisecond(new Millisecond(1)))
})

/**
 * #toNumber()
 */
{
  const pTest = (a, expected) => {
    test(`Should works #toNumber(), ${a}`, (t) => {
      const ms = new Millisecond(a)
      t.is(ms.toNumber(), expected)
    })
  }

  const parameters = [
    [1, 1],
  ]

  parameters.forEach((p) => {
    pTest(...p)
    pTest(...[new Decimal(p[0]), p[1]])
  })
}

/**
 * #toSecond()
 */
{
  const pTest = (a, expected) => {
    test(`Should works #toSecond(), ${a}`, (t) => {
      const ms = new Millisecond(a)
      t.is(ms.toSecond().toNumber(), expected)
    })
  }

  const parameters = [
    [1000, 1],
    [1001, 1.001],
    [1, 0.001],
    [0.1, 0.0001],
  ]

  parameters.forEach((p) => {
    pTest(...p)
    pTest(...[new Decimal(p[0]), p[1]])
  })
}

/**
 * #toMinute()
 */
{
  const pTest = (a, expected) => {
    test(`Should works #toMinute(), ${a}`, (t) => {
      const ms = new Millisecond(a)
      t.is(ms.toMinute().toNumber(), expected)
    })
  }

  const parameters = [
    [1, 0.000016666666666666667],
    [60000, 1],
    [60001, 1.0000166666666666],
  ]

  parameters.forEach((p) => {
    pTest(...p)
    pTest(...[new Decimal(p[0]), p[1]])
  })
}
