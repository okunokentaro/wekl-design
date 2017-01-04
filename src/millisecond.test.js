import test from 'ava'
import {Millisecond} from './millisecond'

/**
 * #toSecondNumber()
 */
{
  const pTest = (a, expected) => {
    test(`Should works #toSecondNumber(), ${a}`, (t) => {
      const ms = new Millisecond(a)
      t.is(ms.toSecondNumber(), expected)
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
  })
}
