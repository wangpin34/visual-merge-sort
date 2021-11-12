import { Queue } from 'utils/queue'
import Subject from 'utils/subject'
import { Item } from './types'

const queue = new Queue()
const subject = new Subject<Array<Item>>('array')

const PERIOD = 800

setInterval(() => {
  if (queue.hasJobs()) {
    queue.consume()
  }
}, PERIOD)

export { subject, queue }
