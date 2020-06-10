module.exports = function addDependencies(api, opts) {
  // 修改 `package.json` 中的字段
  api.extendPackage({
    "dependencies": {
      "axios": "^0.19.0",
      "moment": "^2.24.0"
    },
    "devDependencies": {
      "uglifyjs-webpack-plugin": "^2.2.0",
    }
  })

  if (opts.analyzer) {
    api.extendPackage({
      "devDependencies": {
        "webpack-bundle-analyzer": "^3.8.0"
      }
    })
  }
}