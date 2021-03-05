/* eslint-disable class-methods-use-this */
abstract class BinaryHeap<T, U> {
    protected array: T[];

    protected extractor: (element: T) => U

    public constructor(extractor: (element: T) => U) {
      this.array = [];
      this.extractor = extractor;
    }

    public insert(element: T) {
      this.array.push(element);
      this.heapify(this.array.length - 1);
    }

    public pop() {
      const top = this.array[0];

      this.array[0] = this.array[this.array.length - 1];

      // Re-balance the tree
      this.reBalance(0);
      this.array.pop();

      return top;
    }

    public insertMany(iterator?: IterableIterator<T>) {
      const loopCondition = true;
      while (loopCondition) {
        const element = iterator?.next();

        if (!element || element?.done) { break; }

        this.array.push(element?.value);
        this.heapify(this.array.length - 1);
      }
    }

    public isEmpty() {
      return this.array.length === 0;
    }

    protected parent(index: number) {
      return Math.max(Math.floor((index - 1) / 2), 0);
    }

    protected left(index: number) {
      return index * 2 + 1;
    }

    protected right(index: number) {
      return index * 2 + 2;
    }

    protected maxHeap(elementOneIndex: number, elementTwoIndex: number) {
      return this.extractor(this.array[elementOneIndex]) > this.extractor(this.array[elementTwoIndex]);
    }

    protected minHeap(elementOneIndex: number, elementTwoIndex: number) {
      return this.extractor(this.array[elementOneIndex]) < this.extractor(this.array[elementTwoIndex]);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected comparator(elementOneIndex: number, elementTwoIndex: number) {
      return true;
    }

    protected swap(indexOne: number, indexTwo: number) {
      const tmp = this.array[indexOne];
      this.array[indexOne] = this.array[indexTwo];
      this.array[indexTwo] = tmp;
    }

    protected heapify(index: number) {
      let currentIndex = index;
      let parentIndex = this.parent(currentIndex);

      while (currentIndex && this.comparator(currentIndex, parentIndex)) {
        this.swap(currentIndex, parentIndex);

        currentIndex = parentIndex;
        parentIndex = this.parent(parentIndex);
      }
    }

    protected reBalance(index: number) {
      let top = index;
      const left = this.left(top);
      const right = this.right(top);

      if (left < this.array.length && this.comparator(left, top)) { top = left; }
      if (right < this.array.length && this.comparator(right, top)) { top = right; }

      if (top !== index) {
        this.swap(top, index);
        this.reBalance(top);
      }
    }
}

export default BinaryHeap;
