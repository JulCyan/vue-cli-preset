module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  rules: {
    // 1 为 warn, 2 为 error
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //  结尾不允许有分号
    semi: [2, 'never'],
    // error; 一个缩进必须用2个空格替代, switch语句里面的case 2个空格
    indent: [1, 2, { SwitchCase: 2 }],
    // error; 必须使用单引号
    quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    // warn; 不允许多个空行
    'no-multiple-empty-lines': [1, { max: 1 }],
    // error; 箭头函数的箭头前后必须有空格
    'arrow-spacing': [2, { before: true, after: true }],
    // warn; 推荐使用箭头函数作为回调
    'prefer-arrow-callback': [1, { allowNamedFunctions: true }],
    // warn; 推荐结构赋值
    'prefer-destructuring': [
      1,
      { array: true, object: true },
      { enforceForRenamedProperties: false }
    ],
    // warn; 推荐rest运算符
    'prefer-rest-params': 1,
    // warn; 推荐扩展运算符
    'prefer-spread': 1,
    // error; require symbol description
    'symbol-description': 2,
    // error; 禁止import重复模块
    'no-duplicate-imports': 2,
    // error; 要求使用 let 或 const 而不是 var
    'no-var': 2,
    // error; if, function 等的大括号之前必须要有空格
    'space-before-blocks': [2, 'always'],
    // error; 逗号风格，换行时在行首还是行尾
    'comma-style': [2, 'last'],
    // error; 变量命名需要以驼峰命名法，对属性字段不做限制
    camelcase: [2, { properties: 'never' }],
    // error; 是否允许非空数组里面有多余的空格
    'array-bracket-spacing': [2, 'never'],
    // error; 禁用特定的全局变量
    'no-restricted-globals': 2,
    // error; 禁止变量声明与外层作用域的变量同名
    'no-shadow': 2,
    // error; js关键字和保留字不能作为函数名或者变量名
    'no-shadow-restricted-names': 2,
    // error; 禁止label名称和var相同
    'no-label-var': 2,
    // error; 避免初始化变量值为 undefined
    'no-undef-init': 2,
    // error; 变量使用之前必须进行定义，函数除外
    'no-use-before-define': [2, { functions: false }],
    // error; 禁止 catch 子句的参数与外层作用域中的变量同名
    'no-catch-shadow': 2,
    // error; getter必须有返回值，并且禁止返回值为undefined, 比如 return;
    'getter-return': [2, { allowImplicit: false }],
    // error; 强制 getter 和 setter 在对象中成对出现
    'accessor-pairs': 2,
    // off; 对于数据相关操作函数比如reduce, map, filter等，callback必须有return
    'array-callback-return': 0,
    // error; switch case语句里面一定需要default分支
    'default-case': 2,
    // error; 要求点操作符和属性放在同一行
    'dot-location': [2, 'property'],
    // error; 代码中不允许使用eval
    'no-eval': 2,
    // warn; 单行最多允许160个字符, 对包含url的行不进行此限制
    'max-len': [
      1,
      {
        code: 180,
        ignoreUrls: true,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      }
    ],
    // 文件末尾强制换行  
    'eol-last': 2,
    // 使用 === 替代 ==  
    // 'eqeqeq': [1, 'allow-null'],
    'eqeqeq': 0,
    "@typescript-eslint/ban-ts-ignore": 0,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-this-alias": 0,
    "@typescript-eslint/interface-name-prefix": 0
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
