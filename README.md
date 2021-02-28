# Binary heap
A package for general purpose binary heap data structure that can contain any type of data 

# Installation
```bash
npm i binary-heap.js
```

# Usage
```js
const maxHeap = new MaxHeap( (x) =>x );
maxHeap.insert(3);
maxHeap.insert(5);
maxHeap.insert(7);

maxHeap.pop() // 7
maxHeap.pop() // 5
maxHeap.pop() // 3
maxHeap.pop() // undefined

const minHeap = new MinHeap( (x) =>x );

maxHeap.insert(5);
maxHeap.insert(3);
maxHeap.insert(7);

maxHeap.pop() // 3
maxHeap.pop() // 5
maxHeap.pop() // 7
maxHeap.pop() // undefined
```

# Constructor

| Parameter   | Type | Required| Default| Description     |
| :---        |    :----:   | :---: | :---: |         ---: |
| extractor      | function |    false |   | function that extracts the key used for sorting elements in the heap (should be equal to identity for primitive data types)   |
| iterator   | IterableIterator  | false| | Used to provide the heap with initial elements |

Works with any data structure that implements the iteratable interface to provide it's elements
```js
// Works with arrays, maps, sets
const arr = [1,2,3];
const set = new Set([1,2,3])
const map = new Map();
map.set(1,1)
map.set(2,2)
map.set(3,3);

const maxHeapOne = new MaxHeap(
    (x) =>x,
    arr.values(),
    false
);

const maxHeapTwo = new MaxHeap(
    (x) =>x,
    sets.values(),
    false
);

const maxHeapThree = new MaxHeap(
    (x) =>x,
    map.keys().values(),
    false
)
```
Works with complex objects as long as you provide the right extractor

```js
const arr = [{id:1},{id:2},{id:3}];

const maxHeap = new MaxHeap(
    (x) =>x.id,
    arr.values(),
    false
)
```