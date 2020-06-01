const merge = require("webpack-merge");
const commonConfig = require("./webpack.config");

module.exports = merge(commonConfig, {
  entry: "./src/index.dev.ts",
  mode: "development",
  devtool: "inline-source-map",
});
