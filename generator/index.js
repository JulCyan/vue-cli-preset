const renderFiles = require('./renderFiles')
const addDependencies = require('./addDependencies')
const addScripts = require('./addScripts')
module.exports = (api, options, rootOptions) => {
  addDependencies(api, options)
  renderFiles(api, options)
  addScripts(api, options)
}