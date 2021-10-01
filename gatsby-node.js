const fs = require("fs")
const path = require("path")
const kebabCase = require('lodash.kebabcase');
const LoadablePlugin = require("@loadable/webpack-plugin")

exports.onCreateWebpackConfig = ({ stage, actions, loaders }) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /default-site-plugin/,
            use: loaders.null(),
          },
        ],
      },
    })
  }

  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@config": path.resolve(__dirname, "src/config"),
        "@images": path.resolve(__dirname, "src/images"),
        "@pages": path.resolve(__dirname, "src/pages"),
      },
    },
  })
}
