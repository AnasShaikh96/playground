import { index } from './index.js';
import { expect } from 'chai';

describe('it adds the function', () => {

  it('will return sum of 2 nums', () => {
    const result = index(2, 2);
    expect(result).to.be.eq(4)
  })

  it('passes single value to func', () => {
    const result = index(2);
    expect(result).to.be.eq(2)
  })

  it('should be num only', () => {
    const result = index(NaN, 'test2')
    expect(result).to.be.eq(0)
  })

})