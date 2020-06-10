import { BaseNS } from '@/configs/type'
import { BrowserType, ImplicitParseFalseExcludes, WeChatJsApiList as jsApiList, RegWeChat, PermissionArgs, DataType } from '@/configs/const'
import { IDirectiveBinding } from '@/configs/interface'
import VueRouter, { RawLocation } from 'vue-router/types'
export interface UtilsConfigs {
  router?: VueRouter;
  cookies?: any;
}
// 此处继承没有必要联系, 只是为了区分职责, ts 只能单类继承
export class StorageOperation {
  private readonly cookies: any
  constructor (configs?: UtilsConfigs) {
    this.cookies = configs && configs.cookies
  }

  /**
   * 设置本地缓存
   * @param { key: str , val: any }
   * @retunrs true: bool
   */
  public setS<T> ({ key, val }: { key: string; val: T }): string {
    const result: string = JSON.stringify(val)
    sessionStorage.setItem(key, result)
    return result
  }

  /**
   * 读取本地缓存
   * @param key
   * @retunrs *: any
   */
  public getS (key = ''): string | object {
    let result = sessionStorage.getItem(key) || ''
    try {
      result = JSON.parse(result)
    } catch (error) {
      console.log(error)
    }
    return result
  }

  /**
   * 删除本地缓存
   * @param key
   * @returns {}
   */
  public removeS (key = '') {
    sessionStorage.removeItem(key)
    return this
  }

  public isExistCookies (): boolean {
    return Boolean(this.cookies)
  }

  public setCookie (key: string, val: any, configs?: any): any {
    if (!this.isExistCookies()) return
    return this.cookies.set(key, val, configs)
  }

  public getCookie (key?: string, configs?: any): any {
    if (!this.isExistCookies()) return
    return this.cookies.get(key, configs)
  }

  public removeCookie (key?: string, configs?: any): StorageOperation | undefined {
    if (!this.isExistCookies()) return
    this.cookies.remove(key, configs)
    return this
  }

  public getJSONCookie (key?: string): any {
    if (!this.isExistCookies()) return
    return this.cookies.getJSON(key)
  }
}

export class NumberOperation extends StorageOperation {
  /**
     * 格式化数据
     * @param { val : string }
     * @returns str
     */
  // 将数字过滤为每三位逗号隔开
  public tostr3 (val: BaseNS) {
    return parseFloat(val as string).toLocaleString()
  }

  // 将数字保留两位小数
  public tostr2 (val: BaseNS): BaseNS {
    const isNumber = this.isNumber(val)
    if (val && isNumber) {
      const tempVal = Number(val)
      return tempVal.toFixed(2)
    } else {
      return val
    }
  }

  // 将数字过滤为每三位逗号间隔并保留两位小数
  public tostr32 (val: BaseNS) {
    const tempVal = Number(val)
    return tempVal.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
  }

  /**
    * 隐藏手机中间/后四位
    */
  public phoneHide (tel: BaseNS, type: string) {
    const tempTel = String(tel)
    let phone
    if (String(type) === 'mid') {
      phone = tempTel.replace(tempTel.substring(3, 7), '****')
    } else if (String(type) === 'end') {
      phone = tempTel.replace(tempTel.substring(7, 11), '****')
    }
    return phone
  }

  public isNumber (param: any): boolean {
    return !isNaN(parseFloat(param)) &&
      isFinite(param)
  }
}

export class ESNext extends NumberOperation {
  /**
    * 数组根据数组对象中的某个属性值进行排序的方法
    * 使用例子：newArray.sort(sortBy('number',false)) //表示根据number属性降序排列;若第二个参数不传递，默认表示升序排序
    * @method sortBy
    * @param { attr: string, rev: boolean } { 排序属性,排序方式: true ↑ false ↓ }
    * @retunrs function
    */
  public sortBy ({ attr, rev = true }: any) {
    rev = rev ? 1 : -1
    return function (a: any, b: any) {
      a = a[attr]
      b = b[attr]
      if (a < b) {
        return rev * -1
      }
      if (a > b) {
        return rev * 1
      }
      return 0
    }
  }

  /**
  * @method catchNull:.?实现
  * @param { json | js } root
  * @param { string } next
  * @param { any } defaultParam
  * @returns { json | js }
  */
  public catchNull (root: any, next: string, defaultParam: any): any {
    let val: any = null
    let keys: Array<any> = []
    keys = next.split('.')
    // 根部判断
    if (root) {
      // 键 List 循环
      for (let i = 0; i < keys.length; i++) {
        let current: any = null
        // 键判断是否包含[index]
        if (keys[i].indexOf('[') > -1) {
          // 处理键中有[index]的情况
          const [specialKey]: Array<BaseNS> = keys[i].split('[')
          const strArr: Array<string> = keys[i].split('[')
          strArr.shift()
          // 添加 next keys 是否为纯属组的判断
          let tempCurrent: any = specialKey ? root[specialKey] : root
          let normalGetTimes = 0 // 是否正常完成[index]循环

          for (let g = 0; g < strArr.length; g++) {
            const [index]: Array<BaseNS> = strArr[g].split(']')
            if (tempCurrent) {
              tempCurrent = tempCurrent[index]
              normalGetTimes++
            } else {
              break
            }
          }
          current = normalGetTimes === strArr.length ? tempCurrent : undefined
        } else {
          current = root[keys[i]]
        }
        // 判断当前键值是否为空
        if (current) {
          root = val = current
        } else {
          (ImplicitParseFalseExcludes.includes(current) && (i === keys.length - 1)) ? (root = val = current) : (val = defaultParam)
          break
        }
      }
    } else {
      val = defaultParam
    }
    return val
  }

  /**
    * @method clearSuffix
    * @description 清楚文件后缀
    * @param str
    */
  public clearSuffix (str: string): string {
    let newStr = ''
    if (str.split('').reverse().join('').indexOf('.') !== -1) {
      // @ts-ignore
      newStr = str.split('').reverse().join('').split('.').pop().split('').reverse().join('')
    } else {
      newStr = str
    }
    return newStr
  }

  /**
    * @method strStringSuffix
    * @description 截取文件后缀
    * @param str
    */
  public strStringSuffix (str: string): string {
    let newStr: any = ''
    if (str.indexOf('.') !== -1) {
      [newStr] = str.split('.').reverse()
    } else {
      newStr = str
    }
    return newStr.toLocaleLowerCase()
  }

  /**
    *
    * @method throttle
    * @description 节流构造函数
    * @param func
    * @param time
    * @param option
    * @returns { _throttle }
    */
  public throttle (
    func: (...params: any) => any,
    time = 20,
    option = {
      leading: true, // 首次是否执行
      trailing: false, // 计时结束是否执行最后一次
      context: null // this
    }
  ) {
    let timer: number | undefined
    let previous = new Date(0).getTime()
    const _throttle = (...args: []) => {
      const now = new Date().getTime()
      if (!option.leading) {
        if (timer) return
        timer = setTimeout(() => {
          timer = undefined
          func.apply(option.context, args)
        }, time)
      } else if (now - previous > time) {
        func.apply(option.context, args)
        previous = now
      } else if (option.trailing) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(option.context, args)
        }, time)
      }
    }
    _throttle.cancel = () => {
      previous = 0
      clearTimeout(timer)
      timer = undefined
    }
    return _throttle
  }

  /**
    * @method debounce
    * @description 防抖构造函数
    * @param func
    * @param time
    * @param option
    * @returns { _debounce }
    */
  public debounce (
    func: (...params: any) => any,
    time: number | undefined,
    option = {
      leading: true,
      context: null
    }
  ) {
    let timer: any = null
    const _debounce = (...arg: []) => {
      if (timer) {
        clearTimeout(timer)
      }
      if (option.leading && !timer) {
        timer = setTimeout(() => {
          timer = null
        }, time)
        func.apply(option.context, arg)
      } else {
        timer = setTimeout(() => {
          func.apply(option.context, arg)
          timer = null
        }, time)
      }
    }
    _debounce.cancel = () => {
      clearTimeout(timer)
      timer = null
    }
    return _debounce
  }

  // public setCookie(
  //   name: string,
  //   value: string,
  //   expires: number,
  //   domain: string,
  //   path: string,
  //   secure: string
  // ) {
  //   let cookieText = ''
  //   cookieText += encodeURIComponent(name) + '=' + encodeURIComponent(value)
  //   if (expires) {
  //     let exp = new Date()
  //     exp.setTime(exp.getTime() + expires * 24 * 60 * 60 * 1000)
  //     cookieText += '; expires=' + exp.toUTCString()
  //   }
  //   if (domain) {
  //     cookieText += '; domain=' + domain
  //   }
  //   if (path) {
  //     cookieText += '; path=' + path
  //   }
  //   if (secure) {
  //     cookieText += '; secure'
  //   }
  //   document.cookie = cookieText
  // }

  public browserMode (type: string): boolean {
    const userAgent = navigator.userAgent.toLocaleLowerCase()
    if (type === BrowserType.weChat) {
      return RegWeChat.test(userAgent)
    }
    return false
  }

  public copy<T> (resource: T): T {
    return JSON.parse(JSON.stringify(resource))
  }

  public static typeOfAny (resource: any, type: string): boolean {
    return Object.prototype.toString.call(resource) === type
  }

  public equals (obj1: any, obj2: any): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2)
  }

  public sleep (time = 1): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, time * 1000)
    })
  }

  /**
    * @method turnToUrlQuery
    * @description 将对象转为 url Query
    * @param resource
    * @returns query
    */
  public turnToUrlQuery (resource: any): string {
    return new URLSearchParams(resource).toString()
  }

  /**
   * @method removeDuplicates
   * @description 复杂数据类型数组去重
   * @param resource
   * @returns Array<T>
   */
  public removeDuplicates<T> (resource: Array<T>, useKey = 'id'): Array<T> {
    if (resource.length === 0) {
      return resource
    }
    let preDuplicatesKeys: Array<BaseNS> = []
    let keys: Array<BaseNS> = []
    preDuplicatesKeys = resource.map(item => item[useKey])
    keys = [...new Set(preDuplicatesKeys)]
    if (keys.length === preDuplicatesKeys.length) {
      return resource
    }
    return resource.filter(item => {
      const index = keys.indexOf(item[useKey])
      if (index != -1) {
        keys.splice(index, 1)
        return true
      } else {
        return false
      }
    })
  }
}

export class DOMOperation extends ESNext {
  // 页面平滑滚动
  public scrollTop (number = 0, time = 0) {
    if (!time) {
      document.body.scrollTop = document.documentElement.scrollTop = number
      return number
    }
    const spacingTime = 20 // 设置循环的间隔时间  值越小消耗性能越高
    let spacingInex = time / spacingTime // 计算循环的次数
    let nowTop = document.body.scrollTop + document.documentElement.scrollTop // 获取当前滚动条位置
    const everTop = (number - nowTop) / spacingInex // 计算每次滑动的距离
    const scrollTimer = setInterval(() => {
      if (spacingInex > 0) {
        spacingInex--
        this.scrollTop((nowTop += everTop))
      } else {
        clearInterval(scrollTimer) // 清除计时器
      }
    }, spacingTime)
  }

  public getOffsetByBody (el, attr = 'offsetLeft'): number {
    let offset = 0
    while (el && el.tagName !== 'BODY') {
      offset += el[attr]
      el = el.offsetParent
    }
    return offset
  }

  public getDOMDeep (ele = 'body'): number {
    const getDepth = node => {
      if (!node.children || node.children.length === 0) {
        return 1
      }
      const maxChildrenDepth = [...node.children].map(v => getDepth(v))
      return 1 + Math.max(...maxChildrenDepth)
    }
    return getDepth(document.querySelector(ele))
  }
}

export class RouterOperation extends DOMOperation {
  private readonly router: VueRouter | undefined

  constructor (configs?: UtilsConfigs) {
    super(configs)
    configs && configs.router && (this.router = configs.router)
  }

  public generateAsyncImportRoutes<T> (routes: Array<T>): Array<T> {
    let resultRoutes: Array<any> = []
    resultRoutes = routes.filter((item: any) => item.component).map((item: any) => {
      const newItem: any = {
        ...item,
        component: () => import(/* webpackChunkName: "[request]" */ `@/views/${item.component}.vue`)
      }
      // 子路由也需要挂载 component
      newItem.children && (newItem.children = this.generateAsyncImportRoutes(newItem.children))
      return newItem
    })
    return resultRoutes
  }

  public resoveNewTab (route: RawLocation, router?: VueRouter): void {
    const operation = this.router || router
    const resultRoute = route
    // @ts-ignore
    // '1' 为使用, '0' 为禁用
    resultRoute.query.useQueryParams = '1'

    const { href } = (operation as VueRouter).resolve(route)
    window.open(href, '_blank')
  }
}

export class ProjectSelf extends RouterOperation {
  public static resetStoreAndStorage ({ store, router }) {

  }
}

export class Utils extends ProjectSelf {
  public toast (type: any, message: any, duration: any): void {
    // Toast({
    //   type: type || 'text',
    //   message: message,
    //   duration: duration || 1500,
    // })
  }

  /**
    * 时间格式化
    * @param fmt
    * @param date
    */
  public dateFtt (fmt, date) {
    // author: meizz
    const o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return fmt
  }
}

/**
 * @class Directive
 * @description 指令基础父类
 */
export class Directive {
  public binding: { value: Array<number> | number; arg: string; modifiers: any }
  constructor (binding) {
    this.binding = binding
  }
  
  /**
   * @method constructBinding
   * @description 根据参数构造 vue 指令对象
   * @param value 
   * @param arg 
   * @param modifiers 
   * @param name 
   */
  static constructBinding (value: any, arg = '', modifiers: any = {}, name = 'permission'): IDirectiveBinding {
    return {
      arg,
      modifiers,
      value,
      name,
      rawName: arg ? `v-${name}:${arg}` : `v-${name}`
    }
  }
}

export class PermissionDirective extends Directive {
  public userType: number
  public permissionArgs: any

  constructor (binding: any, userType = 0) {
    super(binding)
    this.userType = userType
    this.permissionArgs = PermissionArgs
  }

  /**
   * @method turnToBinaryPermissionSum
   * @description 将 1248 合集拆分
   * @param value 
   */
  static turnToBinaryPermissionSum (value: BaseNS): Array<number> {
    // 转为二进制
    const binary = parseInt(value as string, 10).toString(2).split('').reverse().join('')
    let multiplier = 1
    const permissionList: Array<number> = []
    for (let i = 0; i < binary.length; i++) {
      // 如果位数为 1 则代表有值, 8421 权限控制, 当前位置有值则有当前倍率的权限
      (binary[i] === '1') && permissionList.push(multiplier)
      multiplier *= 2
    }
    return permissionList
  }

  protected exact (): boolean {
    return this.binding.value === this.userType
  }

  protected inverse (): boolean {
    return this.binding.value !== this.userType
  }

  protected includes (): boolean {
    return (this.binding.value as Array<number>).includes(this.userType)
  }

  protected excludes (): boolean {
    return !(this.binding.value as Array<number>).includes(this.userType)
  }

  /**
   * @method result
   * @description 根据指令参数调用不同的处理方法后返回结果
   * @param userType 
   */
  public result (userType: number = this.userType): boolean {
    this.userType = userType
    const {
      exact,
      inverse,
      includes,
      excludes
    } = PermissionArgs
    let result = true

    switch (this.binding.arg) {
        case exact:
          result = this.exact()
          break
        case inverse:
          result = this.inverse()
          break
        case includes:
          result = this.includes()
          break
        case excludes:
          result = this.excludes()
          break
        default:
          if (ESNext.typeOfAny(this.userType, DataType.number)) {
            result = this.exact()
          } else if (ESNext.typeOfAny(this.userType, DataType.array)) {
            result = this.includes()
          }
    }

    return result
  }
}

export default {
  install (Vue, configs: UtilsConfigs) {
    Vue.prototype.$utils = new Utils(configs)
  }
}
