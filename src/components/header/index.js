import React from "react"
import { Link } from "gatsby"

const Header = () => {
  return (
    <div style={{position: "fixed", top: "0", left: "0", zIndex: '100'}}>
      <Link to="/">
        <p>Home</p>
      </Link>
      <Link to="/page2/">
        <p>Page 2</p>
      </Link>
      <Link to="/page3/">
        <p>Page 3</p>
      </Link>
    </div>
  )
}

export default Header
