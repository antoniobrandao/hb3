import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withApp, Sprite } from 'react-pixi-fiber'
import Circle from './Circle'
import Line from './Line'

let particlesArray = []

let maxX
let maxY
let minX = 0
let minY = 0
let minDistance = 0

let viewportWidth
let viewportHeight

const moveParticle = particle => {
  const movedParticle = { ...particle }

  movedParticle.x += movedParticle.speedX
  movedParticle.y += movedParticle.speedY

  if (movedParticle.x > maxX) {
    movedParticle.x = maxX
    movedParticle.speedX *= -1
  } else if (movedParticle.x < minX) {
    movedParticle.speedX *= -1
  }

  if (movedParticle.y > maxY) {
    movedParticle.y = maxY
    movedParticle.speedY *= -1
  } else if (movedParticle.y < minY) {
    movedParticle.speedY *= -1
  }

  return movedParticle
}

class Particles extends Component {
  state = {
    nodes: [],
    lines: []
  }

  componentDidMount () {
    const { width, height, accentColor, circleFillStyle, extraImagesArray, numParticles } = this.props.options
    viewportWidth = width
    viewportHeight = height
    minDistance = ((viewportWidth / 2) * viewportHeight) / 2
    maxX = viewportWidth - 10
    maxY = viewportHeight - 10
    minX = 10
    minY = 10
    particlesArray = []

    for (var i = 0; i < numParticles; i++) {
      particlesArray.push({
        x: minX + Math.random() * (viewportWidth - minX - 10),
        y: minY + Math.random() * (viewportHeight - minY - 10),
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 3 - 1.5,
        size: Math.random() * 4 + 5,
        strokeWidth: 2,
        accentColor: accentColor,
        circleFillStyle: circleFillStyle,
        viewportWidth: viewportWidth,
        viewportHeight: viewportHeight,
        scale: 0.2 + (Math.random() * 80) / 100
      })
    }

    if (extraImagesArray && extraImagesArray.length) {
      for (var w = 0; w < extraImagesArray.length; w++) {
        particlesArray.push({
          x: minX + Math.random() * (viewportWidth - minX - 10),
          y: minY + Math.random() * (viewportHeight - minY - 10),
          speedX: Math.random() * 3 - 1.5,
          speedY: Math.random() * 3 - 1.5,
          size: Math.random() * 4 + 5,
          scale: 0.2 + (Math.random() * 80) / 100,
          isImage: true,
          texture: extraImagesArray[w]
        })
      }
    }

    this.setState({
      nodes: particlesArray
    })

    this.props.app.ticker.maxFPS = 30
    this.props.app.ticker.speed = 0.2
    this.props.app.ticker.add(this.animate)
  }

  componentWillUnmount () {
    this.props.app.ticker.remove(this.animate)
  }

  animate = test => {
    const { nodes } = this.state
    const newNodes = nodes.map(moveParticle)
    const lines = this.generateLines(newNodes)

    this.setState({ nodes: newNodes, lines: lines })
  }

  generateLines = nodes => {
    const { extraImagesArray } = this.props.options
    const hasExtraImages = extraImagesArray && extraImagesArray.length && extraImagesArray.length > 0
    const lines = []
    let opacityValue = 1

    for (let a = 0; a < nodes.length; a++) {
      for (let b = a; b < nodes.length; b++) {
        let createLine = true

        if (hasExtraImages) {
          const aIsImage = particlesArray[a].isImage
          const bIsImage = particlesArray[b].isImage
          createLine = !aIsImage && bIsImage
        }

        let distance =
          (nodes[a].x - nodes[b].x) * (nodes[a].x - nodes[b].x) + (nodes[a].y - nodes[b].y) * (nodes[a].y - nodes[b].y)

        if (createLine) {
          if (distance < minDistance) {
            opacityValue = 1
            opacityValue = 1 - distance / minDistance

            lines.push({
              opacity: opacityValue,
              x1: nodes[a].x,
              y1: nodes[a].y,
              x2: nodes[b].x,
              y2: nodes[b].y
            })
          }
        }
      }
    }
    return lines
  }

  render () {
    const { nodes, lines } = this.state
    const { accentColor } = this.props.options

    return (
      <Fragment>
        <Fragment>
          {lines.map((line, w) => (
            <Line
              key={w}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              opacity={line.opacity}
              color={accentColor}
            />
          ))}
        </Fragment>
        <Fragment>
          {nodes.map((node, i) =>
            node.isImage ? (
              <Sprite
                key={i}
                x={node.x}
                y={node.y}
                texture={node.texture}
                anchor={0.5}
                // {...node}
              />
            ) : (
              <Circle
                key={i}
                x={node.x}
                y={node.y}
                radius={node.size}
                fill={node.circleFillStyle}
                strokeColor={node.accentColor}
                {...node}
              />
            )
          )}
        </Fragment>
      </Fragment>
    )
  }
}

Particles.propTypes = {
  app: PropTypes.object
}

export default withApp(Particles)
