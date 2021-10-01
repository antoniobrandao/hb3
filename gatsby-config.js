require("dotenv").config()
const {
  NODE_ENV,
  CONTEXT: NETLIFY_ENV = NODE_ENV
} = process.env

const siteUrl = `https://google.com`

module.exports = {
  flags: {
    DEV_SSR: false,
  },
  siteMetadata: {
    title: `react-pixi-fiber Safari test`,
    description: `no description`,
    secondaryDescription: `none`,
    locale: "en",
    author: `@antoniobrandao`,
    siteUrl: "http://google.com",
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-remove-fingerprints`,
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: false,
      },
    }
  ],
}
