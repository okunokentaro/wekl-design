import test from 'ava'
import {Second} from './second'
import {Decimal} from './decimal'

/**
 * Should throws
 */
test('Should throws', (t) => {
  t.throws(() => new Second(new Second(1)))
})

/**
 * #toMinute()
 */
{
  const pTest = (a, expected) => {
    test(`Should works #toMinute(), ${a}`, (t) => {
      const sec = new Second(a)
      t.is(sec.toMinute().toNumber(), expected)
    })
  }

  const parameters = [
    [1, 0.016666666666666666],
    [60, 1],
    [61, 1.0166666666666666],
    [120, 2],
    [3600, 60],
  ]

  parameters.forEach((p) => {
    pTest(...p)
    pTest(...[new Decimal(p[0]), p[1]])
  })
}
