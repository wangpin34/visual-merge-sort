import React from 'react'
import { Item } from './types'

const Bar = React.forwardRef((props: Item, ref: React.Ref<HTMLDivElement>) => {
  const { val } = props

  return <div ref={ref} className={`bar`} style={{ height: `${val}px` }}></div>
})

export default Bar
