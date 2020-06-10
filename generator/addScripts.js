module.exports = function addScripts(api, opts) {
  api.extendPackage({
    scripts: {
      "serve:test": "vue-cli-service serve --mode test",
      "build:test": "vue-cli-service build --mode test",
      "build:prod": "vue-cli-service build --mode production",
    }
  })
}