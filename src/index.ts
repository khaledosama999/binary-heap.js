/* eslint-disable class-methods-use-this */
class BinaryHeap <T, U> {
   private array : T [];

   private isMaxHeap : boolean;

   private extractor: (element: T) => U

   private comparator:(elementOneIndex:number, elementTwoIndex:number) => boolean

   public constructor(
     extractor:(element: T)=> U,
     iterator?: IterableIterator<T>,
     isMaxHeap:boolean = true,
   ) {
     this.array = [];
     this.isMaxHeap = isMaxHeap;
     this.extractor = extractor;
     this.comparator = isMaxHeap ? this.maxHeap : this.minHeap;

     // eslint-disable-next-line no-constant-condition
     while (true) {
       const element = iterator?.next();

       if (!element || element?.done) { break; }

       this.array.push(element?.value);
       this.heapify(this.array.length - 1);
     }
   }

   public insert(element:T) {
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

   private parent(index: number) {
     return Math.max(Math.floor((index - 1) / 2), 0);
   }

   private left(index: number) {
     return index * 2 + 1;
   }

   private right(index:number) {
     return index * 2 + 2;
   }

   private maxHeap(elementOneIndex: number, elementTwoIndex:number) {
     return this.extractor(this.array[elementOneIndex]) > this.extractor(this.array[elementTwoIndex]);
   }

   private minHeap(elementOneIndex: number, elementTwoIndex:number) {
     return this.extractor(this.array[elementOneIndex]) < this.extractor(this.array[elementTwoIndex]);
   }

   private swap(indexOne:number, indexTwo:number) {
     const tmp = this.array[indexOne];
     this.array[indexOne] = this.array[indexTwo];
     this.array[indexTwo] = tmp;
   }

   private heapify(index: number) {
     let currentIndex = index;
     let parentIndex = this.parent(currentIndex);

     while (currentIndex && this.comparator(currentIndex, parentIndex)) {
       this.swap(currentIndex, parentIndex);

       currentIndex = parentIndex;
       parentIndex = this.parent(parentIndex);
     }
   }

   private reBalance(index:number) {
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
