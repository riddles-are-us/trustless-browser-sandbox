module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    // Custom rules here
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "env": {
    "es2020": true
  }
}
