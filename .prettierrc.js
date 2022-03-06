module.exports = {
  ...require('@protofire/subgraph-toolkit/prettier.config.js'),

  printWidth: 120,

  overrides: [
    {
      files: '*.json',
      options: {
        "tabWidth": 2,
        "useTabs": false,
        "semi": false,
        "printWidth": 120,
        "singleQuote": true
      },
    },
  ],
}
