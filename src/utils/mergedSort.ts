import { queue, subject } from '../shared'
import { Job } from './queue'
import { Item } from '../types'

async function merge(arr: Array<Item>, l: number, m: number, r: number) {
  let n1 = m - l + 1
  let n2 = r - m

  // Create temp arrays
  let L = new Array(n1)
  let R = new Array(n2)

  // Copy data to temp arrays L[] and R[]
  for (let i = 0; i < n1; i++) L[i] = arr[l + i]
  for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j]

  // Merge the temp arrays back into arr[l..r]

  // Initial index of first subarray
  let i = 0

  // Initial index of second subarray
  let j = 0

  // Initial index of merged subarray
  let k = l
  while (i < n1 && j < n2) {
    if (L[i].val <= R[j].val) {
      arr[k] = L[i]
      i++
    } else {
      arr[k] = R[j]
      j++
    }
    k++
  }
  // Copy the remaining elements of
  // L[], if there are any
  while (i < n1) {
    arr[k] = L[i]
    i++
    k++
  } // Copy the remaining elements of
  // R[], if there are any
  while (j < n2) {
    arr[k] = R[j]
    j++
    k++
  }

  // save a copy of the array, assign a job to update subject async
  const _arr = [...arr]
  queue.add(new Job(() => subject.setState(_arr)))
}

// l is for left index and r is
// right index of the sub-array
// of arr to be sorted */
async function mergeSort(arr: Array<Item>, l: number, r: number) {
  if (l >= r) {
    return //returns recursively
  }
  var m = l + Math.floor((r - l) / 2)
  mergeSort(arr, l, m)
  mergeSort(arr, m + 1, r)
  merge(arr, l, m, r)
}

export default mergeSort
