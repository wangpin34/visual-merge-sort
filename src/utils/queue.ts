type Exector = () => void
type State = 'initalized' | 'consumed'

class Job {
  state = 'initalized' // initalized or consumed
  exector: Exector
  constructor(exector: Exector) {
    this.exector = exector
  }
  setState(state: State) {
    this.state = state
  }
  exec() {
    this.exector()
    this.setState('consumed')
  }
}

class Queue {
  private jobs: Array<Job> = []
  constructor(jobs = []) {
    this.jobs = jobs
  }
  add(job: Job) {
    this.jobs.push(job)
  }
  consume() {
    if (this.jobs.length) {
      const job = this.jobs.shift()
      job!.exec()
    } else {
      console.log('No more jobs')
    }
  }
  clear() {
    this.jobs = []
  }
  hasJobs() {
    return this.jobs.length > 0
  }
}

export { Job, Queue }
