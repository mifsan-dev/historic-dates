const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";
  return {
    entry: "./src/app/ui/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProd ? "[name].[contenthash].js" : "bundle.js",
      clean: true,
      publicPath: "auto"
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    },
    devtool: isProd ? "source-map" : "eval-source-map",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/
        },

        {
          test: /\.svg$/,
          use: ["@svgr/webpack"]
        },

        // Sass Modules
        {
          test: /\.module\.s[ac]ss$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: isProd
                    ? "[hash:base64:6]"
                    : "[name]__[local]__[hash:base64:5]"
                }
              }
            },
            "postcss-loader",
            {
              loader: "sass-loader",
              options: {
                implementation: require("sass"),
                sassOptions: {
                  quietDeps: true
                }
              }
            }
          ]
        },

        {
          test: /\.css$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader"
          ]
        },

        // Global Sass
        {
          test: /\.s[ac]ss$/,
          exclude: /\.module\.s[ac]ss$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "postcss-loader",
            {
              loader: "sass-loader",
              options: {
                implementation: require("sass"),
                sassOptions: {
                  quietDeps: true
                }
              }
            }
          ]
        }
      ]
    },
    devServer: {
      static: "./public",
      historyApiFallback: true,
      port: 3000,
      open: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html"
      }),
      isProd &&
        new MiniCssExtractPlugin({
          filename: "[name].[contenthash].css"
        })
    ].filter(Boolean)
  };
};
