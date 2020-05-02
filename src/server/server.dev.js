const express = require("express");
const router = require("./router.js");
const app = express();
const webpack = require("webpack");
const configDevClient = require("../config/webpack.config.dev.js");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddlware = require("webpack-hot-middleware");

const port = process.env.PORT || 3000;

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;

app.use("/", router);
app.listen(port);

if (isDev) {
  const compiler = webpack(configDevClient);

  const _webpackDevMiddleware = webpackDevMiddleware(compiler);

  const _webpackHotMiddlware = webpackHotMiddlware(
    compiler,
    configDevClient.devServer
  );

  app.use(_webpackDevMiddleware);
  app.use(_webpackHotMiddlware);
  console.log("Middleware enabled");
}
console.log("Magic happens on port " + port);
