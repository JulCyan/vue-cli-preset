module.exports = function addDependencies(api, opts) {
  // 修改 `package.json` 中的字段
  api.extendPackage({
    "dependencies": {
      "axios": "^0.19.0",
      "moment": "^2.24.0"
    },
    "devDependencies": {
    }
  })
}