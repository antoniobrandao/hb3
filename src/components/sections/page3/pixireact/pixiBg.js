import React, { useMemo } from 'react'
import styled from 'styled-components'
import * as PIXI from 'pixi.js'
import { Stage } from 'react-pixi-fiber'
import Particles from './Particles'
import particleVerticalLine from './particleVerticalLine.png'
import particleHorizontalLine from './particleHorizontalLine.png'

function PixiBackGround ({ size }) {
  const particlesContent = useMemo(() => {
    const { width = 1200, height = 675 } = size || {}

    if (size && size.width && typeof window !== "undefined") {
      const particleVerticalLineTexture = new PIXI.Texture.from(particleVerticalLine)
      const particleHorizontalLineTexture = new PIXI.Texture.from(particleHorizontalLine)
      const options = {
        width: width,
        height: height,
        circleFillStyle: 0x0d999e,
        accentColor: 0x0d999e,
        backgroundColor: 0x000000,
        numParticles: Math.floor((width * height) / 100000),
        particleVerticalLineTexture: particleVerticalLineTexture,
        particleHorizontalLineTexture: particleHorizontalLineTexture,
      }

      return (
        <ParticlesCanvas>
          <Stage options={options}>
            <Particles options={options} />
          </Stage>
        </ParticlesCanvas>
      )
    } return null
  }, [size])

  return <>{particlesContent}</>
}

export default PixiBackGround

const ParticlesCanvas = styled.div({
  height: '100vh',
  width: '100%',
  position: 'fixed',
  top: '0',
  left: '0'
})
