import { generateNestedComputedValue } from '../helpers/objHelpers/objHelpers';

const baseObj = { a: true, b: { c: true, d: { e: true } } };

describe('generateNestedComputedValue', () => {
  it('returns a value at one level of nesting', () => {
    const value = generateNestedComputedValue('a', baseObj);

    expect(value).toBe(baseObj['a']);
  });
  it('returns a value at two levels of nesting', () => {
    const value = generateNestedComputedValue('b.c', baseObj);

    expect(value).toBe(baseObj['b']['c']);
  });
  it.only('returns a value at three levels of nesting', () => {
    const value = generateNestedComputedValue('b.d.e', baseObj);

    expect(value).toBe(baseObj['b']['d']['e']);
  });
});
