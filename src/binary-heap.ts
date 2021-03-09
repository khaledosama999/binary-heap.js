/* eslint-disable class-methods-use-this */
 type Extractor<T, U> = (element: T) => U | T
abstract class BinaryHeap<T, U> {
    protected array: T[];

    protected extractor: Extractor<T, U>

    public constructor(extractor:Extractor<T, U> = (x:T) => x) {
      this.array = [];
      this.extractor = extractor;
    }

    /**
     * Inserts a new element into the heap and re-balances
     *  ```js
     *  const x = new MaxHeap<Number,Number>(x => x)
     *  x.insert(3)
     *  ```
     * @param {T} element The item to be inserted
     *
     * @returns void
     */
    public insert(element: T) {
      this.array.push(element);
      this.heapify(this.array.length - 1);
    }

    /**
     * Pops the top of the heap (depending on the heap type might be the max or the min)
     *  ```js
     *  const x = new MaxHeap<Number,Number>(x => x)
     *  x.insert(3);
     *  const y = x.pop(); // 3
     *  ```
     *
     * @returns {T}
     */
    public pop() {
      const top = this.array[0];

      this.array[0] = this.array[this.array.length - 1];

      // Re-balance the tree
      this.reBalance(0);
      this.array.pop();

      return top;
    }

    /**
     * Similar to insert but inserts many values and re-balances the tree
     *  ```js
     *  const array = [1.2.3]
     *  const x = new MaxHeap<Number,Number>(x => x)
     *  x.insertMany(array.values())
     *  ```
     * @param {IterableIterator<T>} iterator The iterator to provide values
     *
     * @returns void
     */
    public insertMany(iterator?: IterableIterator<T>) {
      const loopCondition = true;
      while (loopCondition) {
        const element = iterator?.next();

        if (!element || element?.done) { break; }

        this.array.push(element?.value);
        this.heapify(this.array.length - 1);
      }
    }

    /**
     * Indicates if the heap is empty or not
     *  ```js
     *  const x = new MaxHeap<Number,Number>(x => x)
     *  x.insertMany(3);
     *  x.isEmpty() // false
     *  x.pop() // 3
     *  x.isEmpty() // true
     *  ```
     *
     * @returns Boolean
     */
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
