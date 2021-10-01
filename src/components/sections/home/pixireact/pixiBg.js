import React, { useMemo } from 'react'
import styled from 'styled-components'
import * as PIXI from 'pixi.js'
import { Stage } from 'react-pixi-fiber'
import Particles from 'components/elements/pixi/Particles'

import logo2 from '../logos/avalanche.png'

function PixiBackGround ({ size }) {
  const particlesContent = useMemo(() => {
    const { width = 1200, height = 675 } = size || {}

    if (size && size.width && typeof window !== "undefined") {
      const logo1Texture = new PIXI.Texture.from(logo2)
      const logo2Texture = logo1Texture
      const logo3Texture = logo1Texture
      const logo4Texture = logo1Texture
      const logosArray = [logo1Texture, logo2Texture, logo3Texture, logo4Texture]

      const options = {
        width: width,
        height: height,
        circleFillStyle: 0x000000,
        accentColor: 0x0d999e,
        backgroundColor: 0x000000,
        numParticles: Math.floor((width * height) / 100000),
        extraImagesArray: logosArray
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
  opacity: '0.7',
  height: '100vh',
  width: '100%',
  position: 'absolute',
  top: '0',
  left: '0'
})
