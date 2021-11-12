import { Item } from '../types'

const generateRandomArr = (lower: number, upper: number, N: number) => {
  let arr = []
  for (let i = 0; i < N; i++) {
    let val = Math.floor(Math.random() * upper)
    if (val > lower) {
      arr.push({
        id: i + '',
        val,
      })
    } else {
      arr.push({
        id: i + '',
        val: lower,
      })
    }
  }
  return arr as Array<Item>
}

export default generateRandomArr
