import React from "react"
import HeroBackground from "./pixireact"
import useSize from "helpers/useSize"

function SolutionsHero() {
  const target = React.useRef(null)
  const size = useSize(target)
  return (
    <div ref={target} style={{minHeight: '100vh', width: "100%"}} borderBottom borderColor="#00c2ce36">
      <HeroBackground size={size} />
    </div>
  )
}

export default SolutionsHero
