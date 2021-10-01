/* eslint-disable */
import React, { useLayoutEffect } from 'react'
import useResizeObserver from '@react-hook/resize-observer'

export const isSSR = typeof window === 'undefined'

const useSize = target => {
  if (isSSR) return null

  const [size, setSize] = React.useState()
  useLayoutEffect(() => {
    setSize(target.current.getBoundingClientRect())
  }, [target])

  useResizeObserver(target, entry => setSize(entry.contentRect))
  return size
}

export default useSize
