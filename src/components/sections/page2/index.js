import React from "react"
import styled from "styled-components"
import Background from "./Background"
import useSize from "helpers/useSize"

function CommunityHero() {
  const target = React.useRef(null)
  const size = useSize(target)
  return (
    <CustomSection ref={target}>
      <Background size={size}/>
    </CustomSection>
  )
}

export default CommunityHero

const CustomSection = styled.div({
  width: "100%",
  minHeight: "100vh",
  justifyContent: "center",
})
