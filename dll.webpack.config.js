const DojoWebpackPlugin = require("dojo-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  resolve: {
    extensions: [".js", ".css"]
  },
  entry: {
    dojo: ["dojo/_base/lang", "dojo/has", "dojo/_base/declare"]
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "dojo.[name].js",
    library: "[name]_[hash]"
  },
  plugins: [
    new webpack.DllPlugin({
      context: path.join(__dirname, "node_modules", "dojo"),
      path: path.join(__dirname, "dist", "[name]-manifest.json"),
      name: "[name]_[hash]"
    }),
		new DojoWebpackPlugin({
      globalContext: path.join(__dirname, "node_modules", "dojo"),
			loaderConfig: require("./js/loaderConfig"),
			environment: {dojoRoot: "dist"},	// used at run time for non-packed resources (e.g. blank.gif)
			buildEnvironment: {dojoRoot: "node_modules"}, // used at build time
			locales: ["en"]
		})
  ],
};
