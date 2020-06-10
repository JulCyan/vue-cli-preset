module.exports = function renderFiles(api, opts) {
  const filesToDelete = [
    // 'postcss.config.js',
    // '_browserslistrc',
    // 'babel.config.js',
    '.gitignore',
    '.eslintrc.js',
    // 'public/favicon.ico',
    // 'public/index.html',
    'src/App.vue',
    'src/main.ts',
    'src/assets/logo.png',
    'src/components/HelloWorld.vue',
    'src/router/index.ts',
    'src/router/index.js',
    'src/store/index.ts',
    'src/store/index.js',
    'src/views/About.vue',
    'src/views/Home.vue',
    'tests/unit/example.spec.ts',
    // 'tsconfig.json'
  ]

  api.render(files => {
    Object.keys(files)
      .filter(name => filesToDelete.indexOf(name) > -1)
      .forEach(name => delete files[name])
    if (files['tsconfig.json']) {
      let tsConfig = JSON.parse(files['tsconfig.json'])
      tsConfig['compilerOptions']['noImplicitAny'] = false
      files['tsconfig.json'] = JSON.stringify(tsConfig, null, 2)
    }
  })

  api.render('../templates')
}