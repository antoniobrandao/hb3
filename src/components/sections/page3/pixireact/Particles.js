import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withApp, Sprite } from "react-pixi-fiber";
import Star from './Star'

let particlesArray = []

let maxX;
let maxY;
let minX = 0;
let minY = 0;

let viewportWidth
let viewportHeight

const moveParticle = particle => {
  const movedParticle = { ...particle };

  movedParticle.x += movedParticle.speedX;
  movedParticle.y += movedParticle.speedY;
  
  if (particle.orientation === 'vertical') {
    const randomX = Math.round(Math.random() * window.innerWidth)
    movedParticle.speedX = 0
    if (movedParticle.y > maxY) {
      movedParticle.y = minY
      movedParticle.x = randomX
      movedParticle.speedY = 5 + ((Math.random() * 5) - 2.5)
    } else if (movedParticle.y < minY) {
      movedParticle.y = maxY - 10
      movedParticle.x = randomX
      movedParticle.speedY = -1 * 5 + ((Math.random() * 5) - 2.5)
    }
  } else {
    const randomY = Math.round(Math.random() * window.innerHeight)
    movedParticle.speedY = 0
    if (movedParticle.x > maxX) {
      movedParticle.x = minX
      movedParticle.y = randomY
      movedParticle.speedX = 5 + ((Math.random() * 5) - 2.5)
    } else if (movedParticle.x < minX) {
      movedParticle.x = maxX - 10
      movedParticle.y = randomY
      movedParticle.speedX = -1 * 5 + ((Math.random() * 5) - 2.5)
    }
  }

  return movedParticle;
};

const getRandomOrientation = function() {
  const oneOrTwo = Math.round( 1 + Math.random() * 1)
  if (oneOrTwo === 1) {
    return 'vertical'
  }
  return 'horizontal'
}

const getRandomDirection = function() {
  const forwardOrBackward = Math.round( 1 + Math.random() * 1)
  if (forwardOrBackward === 1) {
    return 1
  }
  return -1
}

class Particles extends Component {
  state = {
    nodes: [],
  };

  componentDidMount() {
    const {
      width,
      height,
      accentColor,
      circleFillStyle,
      particleVerticalLineTexture,
      particleHorizontalLineTexture,
      numParticles
    } = this.props.options
    viewportWidth = width
    viewportHeight = height
    maxX = viewportWidth - 10;
    maxY = viewportHeight - 10;
    minX = 10;
    minY = 10;
    particlesArray = []

    for (var i = 0; i < numParticles; i++) {
      const particleOrientation = getRandomOrientation()
      const particleDirectionX = getRandomDirection()
      const speedX = (particleOrientation === 'vertical' ? 0 : 5 + (Math.random() * 5) - 2.5) * particleDirectionX;
      const particleDirectionY = getRandomDirection()
      const speedY = (particleOrientation === 'vertical' ? 5 + (Math.random() * 5) - 2.5 : 0) * particleDirectionY;
      const random1 = 0.4 + (Math.random() - 0.4)
      particlesArray.push({
        x: minX + Math.random() * (viewportWidth - minX - 10),
        y: minY + Math.random() * (viewportHeight - minY - 10),
        orientation: particleOrientation,
        alpha: random1,
        speedX: speedX,
        speedY: speedY,
        particleDirectionX: particleDirectionX,
        particleDirectionY: particleDirectionY,
        size: 2 + (Math.random() * 3),
        strokeWidth: 2,
        accentColor: accentColor,
        circleFillStyle: circleFillStyle,
        viewportWidth: viewportWidth,
        viewportHeight: viewportHeight,
        particleVerticalLineTexture: particleVerticalLineTexture,
        particleHorizontalLineTexture: particleHorizontalLineTexture,
        scale: 1,
      })
    }

    this.setState({
      nodes: particlesArray,
    });

    this.props.app.ticker.maxFPS = 30
    this.props.app.ticker.speed = 0.2
    this.props.app.ticker.add(this.animate);
  }

  componentWillUnmount() {
    this.props.app.ticker.remove(this.animate);
  }

  animate = (test) => {
    const { nodes } = this.state;
    const newNodes = nodes.map(moveParticle);

    this.setState({ nodes: newNodes });
  };

  render() {
    const { nodes } = this.state;

    return (
      <Fragment>
        <Fragment>
          {nodes.map((node, i) => (
            node.isImage ?
              <Sprite
                key={i}
                x={node.x}
                y={node.y}
                texture={node.texture}
                anchor={0.5}
                // {...node}
              />
              : 
              <Star
                key={i}
                x={node.x}
                y={node.y}
                radius={node.size}
                orientation={node.orientation}
                alpha={node.alpha}
                particleDirectionX={node.particleDirectionX}
                particleDirectionY={node.particleDirectionY}
                fill={node.circleFillStyle}
                strokeColor={node.accentColor}
                {...node}
              />
          ))}
        </Fragment>
      </Fragment>
    );
  }
}

Particles.propTypes = {
  app: PropTypes.object,
};
          

export default withApp(Particles);
