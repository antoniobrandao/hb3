import React from "react"
import PropTypes from "prop-types"
import Nav from "./header"

const Layout = ({ children, isPrimary, ...props }) => {
  return (
    <div style={{width: "100%", backgroung: "black"}} backgroundColor="black">
      <Nav />
      {children}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
