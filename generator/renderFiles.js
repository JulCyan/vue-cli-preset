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
    'tsconfig.json'
  ]

  // console.log('\n[luban-h5 component plugin tips]\n \t GeneratorAPI options:', opts)

  // https://github.com/vuejs/vue-cli/issues/2470
  api.render(files => {

console.log(`----------------------------111111111111111111111


${Object.keys(files)}

---------------------------------------11111111111111111111`);


    Object.keys(files)
      .filter(name => filesToDelete.indexOf(name) > -1)
      .forEach(name => delete files[name])


      console.log(`----------------------------222222222222


${Object.keys(files)}

---------------------------------------22222222222222222`);
  })

  api.render('../templates')

  // 配置文件
  // api.render({
  //   './.eslintrc.js': './templates/_eslintrc.js',
  //   './.env.development': './templates/_env.development',
  //   './.env.production': './templates/_env.production',
  //   './.env.test': './templates/_env.test',
  //   './.browserslistrc': './templates/_browserslistrc',
  // })
}