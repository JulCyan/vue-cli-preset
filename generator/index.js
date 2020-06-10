const renderFiles = require('./renderFiles')
const addDependencies = require('./addDependencies')
const addScripts = require('./addScripts')
module.exports = (api, options, rootOptions) => {
  addDependencies(api, options)
  renderFiles(api, options)
  addScripts(api, options)

  // // 复制并用 ejs 渲染 `./template` 内所有的文件
  // api.render('./template')

  // if (options.foo) {
  //   // 有条件地生成文件
  // }
}