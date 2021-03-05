/* eslint-disable no-constant-condition */
/* eslint-disable no-cond-assign */
import { expect } from 'chai';
import { MaxHeap } from '../src/index';

describe('Methods', () => {
  it('the isEmpty method works', () => {
    const maxHeap = new MaxHeap((x) => x);
    maxHeap.insertMany([1].values());

    expect(maxHeap.isEmpty()).to.eq(false);

    maxHeap.pop();
    expect(maxHeap.isEmpty()).to.eq(true);
  });
});
