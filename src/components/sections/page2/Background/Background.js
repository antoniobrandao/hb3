import React, { useMemo } from "react"
import styled from "styled-components"
import { Stage } from "react-pixi-fiber"
import Particles from "components/elements/pixi/Particles"

function PixiBackGround({ size }) {
  const particlesContent = useMemo(() => {
    const { width = 1200, height = 675 } = size || {}

    if (size && size.width && typeof window !== "undefined") {
      const options = {
        width: width,
        height: height,
        circleFillStyle: 0x000000,
        accentColor: 0x0d999e,
        backgroundColor: 0x000000,
        numParticles: Math.floor((width * height) / 100000),
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
  height: "100vh",
  width: "100%",
  position: "absolute",
  top: "0",
  left: "0",
  opacity: "0.5"
})
