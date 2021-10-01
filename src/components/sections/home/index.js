import React from "react"
import styled from "styled-components"
import HeroBackground from "./pixireact"
import useSize from "helpers/useSize"

function HomeHero() {
  const target = React.useRef(null)
  const size = useSize(target)
  return (
    <CustomSection ref={target} borderBottom>
      <HeroBackground size={size} />
    </CustomSection>
  )
}

export default HomeHero

const CustomSection = styled.div({
  minHeight: "100vh",
  justifyContent: "center",
})
