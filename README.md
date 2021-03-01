# Binary heap
A package for general purpose binary heap data structure that can contain any type of data 

# Installation
```bash
npm i binary-heap.js
```
# Constructor

| Parameter   | Type | Required| Default| Description     |
| :---        |    :----:   | :---: | :---: |         ---: |
| extractor      | function |    false |   | function that extracts the key used for sorting elements in the heap (should be equal to identity for primitive data types)   |

# Methods

| Name   | Description | Return |
| :---        |    :----:   | ---: | 
| Insert      | Insert a single element into the heap  |    void |  
| InsertMany   | Inserts Many elements into the heap  | void| 
| pop   | Pops the top element (maximum or minimum depending on the type of the heap)| type T (type of elements inserted)| 

# Usage
```js
const maxHeap = new MaxHeap( (x) =>x );
maxHeap.insert(3);
maxHeap.insertMany([5,7].values())

maxHeap.pop() // 7
maxHeap.pop() // 5
maxHeap.pop() // 3
maxHeap.pop() // undefined

const minHeap = new MinHeap( (x) =>x );

maxHeap.insert(5);
maxHeap.insertMany([3,7].values())

maxHeap.pop() // 3
maxHeap.pop() // 5
maxHeap.pop() // 7
maxHeap.pop() // undefined
```

Works with any data structure that implements the iteratable interface to provide it's elements

```js
// Works with arrays, maps, sets
const arr = [1,2,3];
const set = new Set([1,2,3])
const map = new Map();
map.set(1,1)
map.set(2,2)
map.set(3,3);

const maxHeapOne = new MaxHeap((x) =>x);
maxHeapOne.insertMany(arr.values());

const maxHeapTwo = new MaxHeap((x) =>x);
maxHeapTwo.insertMany(set.values());

const maxHeapThree = new MaxHeap((x) =>x);
maxHeapThree.insertMany(map.keys().values());

```
Works with complex objects as long as you provide the right extractor

```js
const arr = [{id:1},{id:2},{id:3}];

const maxHeap = new MaxHeap((x) =>x.id);
maxHeap.insertMany(arr.values());

```