const merge = require("webpack-merge");
const commonConfig = require("./webpack.config");
const { version } = require("./package.json");

module.exports = merge(commonConfig, {
  entry: "./src/index.ts",
  mode: "production",
  output: {
    filename: `main_v${version}.js`,
    library: "admios",
    libraryTarget: "window",
  },
});
