// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: "module"
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    "indent": ["error", 4],
    "no-alert": "error",
    "no-empty-function": "warn",
    "no-cond-assign": "error",
    "no-empty":"warn",
    "no-multi-spaces": "error",
    "no-unused-vars": "error",
    "block-spacing": ["error", "always"],
    "brace-style": ["error", "1tbs"],
    "comma-spacing": [1, { "before": false, "after": true }],  
    "comma-style": ["error", "last"],
    "func-call-spacing": ["error", "never"]
  }
}
