module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off"
  },
  overrides: [
    {
      files: [
        "*.config.js",
        "*.config.cjs",
        "webpack.config.js",
        "postcss.config.js",
        ".eslintrc.js"
      ],
      env: {
        node: true
      }
    },
    {
      files: ["*.config.js", "*.cjs"],
      rules: {
        "@typescript-eslint/no-var-requires": "off"
      }
    }
  ],
  env: {
    browser: true,
    es2021: true
  }
};
