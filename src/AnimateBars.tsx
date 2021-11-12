import React, { useRef, useEffect, useLayoutEffect, useState } from 'react'

function usePrevious<T>(value: T) {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

interface BoundingBoxes {
  [key: string]: DOMRect
}

function calculateBoundingBoxes(children: React.ReactChild[]) {
  const boundingBoxes: BoundingBoxes = {}
  React.Children.forEach(children, (child: React.ReactChild) => {
    //@ts-ignore
    const domNode = child?.ref.current
    const nodeBoundingBox = domNode.getBoundingClientRect()
    //@ts-ignore
    boundingBoxes[child.key] = nodeBoundingBox
  })
  return boundingBoxes
}

interface Props {
  children: React.ReactChild[]
}

function AnimateBars({ children }: Props) {
  const [boundingBoxes, setBoundingBoxes] = useState<BoundingBoxes>({})
  const [preBoundingBoxes, setPreBoundingBoxes] = useState<BoundingBoxes>({})
  const preChildren = usePrevious<React.ReactChild[]>(children)

  useLayoutEffect(() => {
    const newBoundingBoxes = calculateBoundingBoxes(children)
    setBoundingBoxes(newBoundingBoxes)
  }, [children])

  useLayoutEffect(() => {
    if (preChildren) {
      const newBoundingBoxes = calculateBoundingBoxes(preChildren)
      setPreBoundingBoxes(newBoundingBoxes)
    }
  }, [preChildren])

  useLayoutEffect(() => {
    const hasPrevBoundingBoxes = Object.keys(preBoundingBoxes).length

    if (hasPrevBoundingBoxes) {
      React.Children.forEach(children, (child) => {
        //@ts-ignore
        const domNode = child.ref.current
        //@ts-ignore
        const firstBox = preBoundingBoxes[child.key]
        //@ts-ignore
        const lastBox = boundingBoxes[child.key]
        const changeInX = firstBox.left - lastBox.left

        if (changeInX) {
          requestAnimationFrame(() => {
            domNode.style.transform = `translateX(${changeInX}px)`
            domNode.style.transition = 'transform 0s'
            domNode.style.backgroundColor = 'blueviolet'

            requestAnimationFrame(() => {
              domNode.style.transform = ''
              domNode.style.backgroundColor = 'aqua'
              domNode.style.transition = `all 300ms ease-in-out`
            })
          })
        }
      })
    }
  }, [boundingBoxes, preBoundingBoxes, children])

  return children
}

export default AnimateBars
