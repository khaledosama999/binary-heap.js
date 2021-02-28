import BinaryHeap from './binary-heap';

class MinHeap<T, U> extends BinaryHeap<T, U> {
  protected comparator(elementOneIndex: number, elementTwoIndex: number) {
    return this.extractor(this.array[elementOneIndex]) < this.extractor(this.array[elementTwoIndex]);
  }
}

export default MinHeap;
