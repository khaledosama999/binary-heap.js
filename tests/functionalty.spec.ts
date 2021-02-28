/* eslint-disable no-constant-condition */
/* eslint-disable no-cond-assign */
import { expect } from 'chai';
import { MaxHeap, MinHeap } from '../src/index';

describe('Functionality', () => {
  it('it works as a max heap', () => {
    const maxHeap = new MaxHeap((x) => x, [1, 7, 5, 8].values());

    const sortedArray = [];

    while (true) {
      const x = maxHeap.pop();
      if (!x) break;

      sortedArray.push(x);
    }

    expect(sortedArray).to.have.ordered.members([8, 7, 5, 1]);
  });

  it('it works as a min heap', () => {
    const minHeap = new MinHeap((x) => x, [1, 7, 5, 8].values());

    const sortedArray = [];

    while (true) {
      const x = minHeap.pop();
      if (!x) break;

      sortedArray.push(x);
    }

    expect(sortedArray).to.have.ordered.members([1, 5, 7, 8]);
  });

  it('it works with sets', () => {
    const maxHeap = new MaxHeap((x) => x, new Set([1, 7, 5, 8]).values());

    const sortedArray = [];

    while (true) {
      const x = maxHeap.pop();
      if (!x) break;

      sortedArray.push(x);
    }

    expect(sortedArray).to.have.ordered.members([8, 7, 5, 1]);
  });

  it('it works with maps', () => {
    const map: Map<number, string> = new Map();

    map.set(1, '1');
    map.set(7, '7');
    map.set(5, '5');
    map.set(8, '8');

    const maxHeap = new MaxHeap((x) => x, map.keys());

    const sortedArray = [];

    while (true) {
      const x = maxHeap.pop();
      if (!x) break;

      sortedArray.push(x);
    }

    expect(sortedArray).to.have.ordered.members([8, 7, 5, 1]);
  });

  it('it works with complex objects given the right extractor', () => {
    const array = [{ id: 1 }, { id: 7 }, { id: 3 }, { id: 8 }];

    const maxHeap = new MaxHeap(
      (x) => x.id,
      array.values(),
    );

    const sortedArray = [];

    while (true) {
      const x = maxHeap.pop();
      if (!x) break;

      sortedArray.push(x);
    }

    expect(sortedArray).to.deep.eq([{ id: 8 }, { id: 7 }, { id: 3 }, { id: 1 }]);
  });

  it('it works with complex objects given the right extractor and use insert many for bulk', () => {
    const array = [{ id: 1 }, { id: 7 }, { id: 3 }, { id: 8 }];

    const maxHeap = new MaxHeap((x) => x.id, array.values());

    const newArray = [{ id: 2 }];
    const sortedArray = [];

    maxHeap.insertMany(newArray.values());
    while (true) {
      const x = maxHeap.pop();
      if (!x) break;

      sortedArray.push(x);
    }

    expect(sortedArray).to.deep.eq([{ id: 8 }, { id: 7 }, { id: 3 }, { id: 2 }, { id: 1 }]);
  });
});
