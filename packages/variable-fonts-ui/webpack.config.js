const path = require("path");
const fs = require("fs");
const MiniHtmlWebpackPlugin = require("mini-html-webpack-plugin");
const { generateCSSReferences, generateJSReferences } = MiniHtmlWebpackPlugin;

const outputDir = "lib/";

module.exports = {
  entry: ["@babel/polyfill", "./index.js"],
  mode:
    process.env.WEBPACK_ENV ||
    process.env.BABEL_ENV ||
    process.env.NODE_ENV ||
    "production",
  resolve: {
    extensions: [".js", ".json", ".scss"],
    modules: ["node_modules"],
    alias: {
      "~": path.resolve(__dirname, "src/")
    }
  },
  context: path.resolve(__dirname, "src"),
  output: {
    // path: path.resolve(__dirname, "lib/"),
    path: path.join(__dirname, outputDir), // where builds go
    // publicPath: path.resolve(__dirname, "lib/"),
    filename: "bundle.js",
    globalObject: "this"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          cacheDirectory: false
        }
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "fonts/",
          publicPath: outputDir + "fonts/"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
              localIdentName: "[local]___[hash:base64:5]"
            }
          }
        ]
      }
    ],
    exprContextCritical: false
  },
  plugins: [
    new MiniHtmlWebpackPlugin({
      context: {
        title: "Variable Typee"
      },
      template: ({ css, js, title, publicPath }) => `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>${title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">        
            ${generateCSSReferences(css, publicPath)}
          </head>
          <body>
            <div id="root"></div>
            ${generateJSReferences(js, publicPath)}
          </body>
        </html>`
    })
  ],
  node: {
    fs: "empty",
    module: "empty",
    net: "empty"
  }
};

if (process.env.WEBPACK_SERVE) {
  module.exports.serve = {
    devMiddleware: {
      writeToDisk: true,
      stats: "minimal",
      publicPath: "/" + outputDir
    },
    content: path.resolve(__dirname, "lib"),
    hotClient: true,
    port: 4444
  };
}
