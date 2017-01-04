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

  pTest(1000, 1)
  pTest(1001, 1.001)
  pTest(1, 0.001)
  pTest(0.1, 0.0001)
}
