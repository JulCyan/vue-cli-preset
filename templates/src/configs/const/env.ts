// Env
export enum Mode {
  development = 'development',
  production = 'production',
  testing = 'test',
}

export enum CookieDomain {
  development = '',
  production = '.main.com',
  test = '',
}

const { NODE_ENV } = process.env
export const _isDev: boolean = NODE_ENV === Mode.development
export const _isProd: boolean = NODE_ENV === Mode.production
export const _isTest: boolean = NODE_ENV === Mode.testing
// @ts-ignore
export const COOKIE_DOMAIN: string = CookieDomain[NODE_ENV]

export const Prefix = '/prefix/'

// Browser ---------------------------------------------------
export enum BrowserType {
  weChat = 'weChat',
}
