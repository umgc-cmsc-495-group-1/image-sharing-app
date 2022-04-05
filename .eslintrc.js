module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: "*/tsconfig.json"
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  plugins: [
    '@typescript-eslint',
    'jest',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:eslint-plugin-react/recommended',
    'plugin:eslint-plugin-react-hooks/recommended'
  ],
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
    commonjs: true
  },
  rules: {
    'no-unused-vars': 2
  }
}
