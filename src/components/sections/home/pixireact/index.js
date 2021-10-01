import React from 'react'
const Pixi = React.lazy(() => import('./pixiBg'))

export default function PixiBackground (props) {
  const isSSR = typeof window === 'undefined'

  return (
    <>
      {!isSSR && (
        <React.Suspense fallback={<div />}>
          <Pixi {...props} />
        </React.Suspense>
      )}
    </>
  )
}
