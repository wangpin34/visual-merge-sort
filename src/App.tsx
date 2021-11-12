import { useState, useEffect, createRef } from 'react'
import generateRandomArr from './utils/randomArrayGen'
import mergeSort from 'utils/mergedSort'
import Bar from './Bar'
import { queue, subject } from './shared'
import './App.css'
import { Item } from './types'
import AnimateBars from './AnimateBars'

const ARRAY_SIZE = 20

function getNewArray() {
  return generateRandomArr(5, 200, ARRAY_SIZE)
}

function App() {
  let [array, setArray] = useState<Array<Item>>([])

  useEffect(() => {
    const subscription = subject.subscribe((value) => {
      setArray(value)
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const generateNewArray = () => {
    queue.clear()
    subject.setState(getNewArray())
  }

  const mergedSortArray = async () => {
    await mergeSort(array, 0, array.length - 1)
  }

  return (
    <div className="App">
      <button onClick={generateNewArray}>Generate New Array</button>
      <button onClick={mergedSortArray}>Merge Sort</button>
      <h1>length:{array.length}</h1>
      <div className="bar-container">
        <AnimateBars>
          {array.map((element) => (
            <Bar key={element.id} {...element} ref={createRef()} />
          ))}
        </AnimateBars>
      </div>
    </div>
  )
}

export default App
