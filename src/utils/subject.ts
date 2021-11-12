class Subject<T> {
  name: string
  subscribers = new Map()
  value: T | null = null
  constructor(name: string, initialValue = null) {
    this.name = name
    this.value = initialValue
  }
  setState(value: T) {
    console.log('Setting state')
    this.value = value
    this.notifyAllSubscribers()
  }
  getState() {
    return this.value
  }
  notifyAllSubscribers() {
    for (let [, subscriber] of this.subscribers) {
      subscriber(this.value)
    }
  }
  subscribe(subscriber: (value: T) => void) {
    const KEY = Math.random() + ''
    this.subscribers.set(KEY, subscriber)
    return {
      unsubscribe: () => {
        if (this.subscribers.has(KEY)) {
          this.subscribers.delete(KEY)
        }
      },
    }
  }
}

export default Subject
