export * from './env'
export * from './mime-type'
export * from './regexp'
export * from './cookies'

// Http Status --------------------------------------------------
export const SuccessStatus: Array<number> = [200, 201, 202, 204]
export const RedirectStatus: Array<number> = [301, 302]
export const ClientErrorStatus: Array<number> = [400, 404, 406, 422]
export const UnauthorizedStatus: Array<number> = [401, 403]
export const ServerErrorStatus: Array<number> = [500]

export const WeChatJsApiList: Array<string> = ['updateAppMessageShareData', 'updateTimelineShareData']

// 隐式类型转换为 false -------------------------------------------
export const ImplicitParseFalse = [0, -0, NaN, undefined, null, '', false]
export const ImplicitParseFalseExcludes = [0, -0, NaN, '']

// Directive 
export enum PermissionArgs {
  exact = 'exact',
  inverse = 'inverse',
  includes = 'includes',
  excludes = 'excludes',
}

export enum DataType {
  string = '[object String]',
  number = '[object Number]',
  boolean = '[object Boolean]',
  undefined = '[object Undefined]',
  null = '[object Null]',
  function = '[object Function]',
  array = '[object Array]',
  date = '[object Date]',
  regExp = '[object RegExp]',
  object = '[object Object]',
}

