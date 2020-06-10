const THROTTLE_TIME_OUT = 10 * 1000
const DEBOUNCE_TIME_OUT = .3 * 1000
export const CLEAR_TIMER_OPERATOR = {
  THROTTLES: {},
  CURRENTMETHOD: ''
}
/**
 * @member Debounce 防抖装饰器
 * @param time
 * @returns DecoratorFunc (target, name, description) => void 
 */
// 接受装饰器参数
export function Debounce(...args: any) {
  // 返回装饰器函数
  return function (target, name, descriptor) {
    const method = descriptor.value

    // 生成 debounce 默认参数
    let tempTime = DEBOUNCE_TIME_OUT
    if (args[0] !== undefined) {
      [tempTime] = args
    }

    let configs = {
      func: method,
      time: tempTime,
      option: {
        leading: false, // 首次是否执行
        context: null // this
      }
    }

    let timer: any = null
    let { func, time, option } = configs

    // 生成防抖函数
    const _debounce = (...arg: []) => {
      if (timer) {
        clearTimeout(timer)
      }
      if (option.leading && !timer) {
        timer = setTimeout(() => {
          timer = null
        }, time)
        func.apply(option.context, ...arg)
      } else {
        timer = setTimeout(() => {
          func.apply(option.context, ...arg)
          timer = null
        }, time)
      }
    }

    // 重写 function ...params 为原 function 参数
    descriptor.value = function (...params: any) {
      // 获取当前 this
      let _this = this
      // 更改运行时的防抖函数 this 指向
      configs.option.context = _this
      //@ts-ignore
      _debounce(params)
    }
  }
}

/**
 * @member Throttle 节流装饰器
 * @param time
 * @returns DecoratorFunc (target, name, description) => void 
 */
// 接受装饰器参数
export function Throttle(...args: any) {
  // 返回装饰器函数
  return function (target, name, descriptor) {
    const method = descriptor.value
    // 生成 throttle 默认参数
    let tempTime = THROTTLE_TIME_OUT
    if (args[0] !== undefined) {
      [tempTime] = args
    }

    let configs = {
      func: method,
      time: tempTime,
      option: {
        leading: true,
        trailing: false, // 计时结束是否执行最后一次
        context: null,
      }
    }

    let timer: any = null
    let { func, time, option } = configs

    // 生成节流函数
    let previous = new Date(0).getTime()
    const _throttle = (...arg: []) => {
      CLEAR_TIMER_OPERATOR.CURRENTMETHOD = name
      let now = new Date().getTime()
      if (!option.leading) {
        if (timer) return
        timer = setTimeout(() => {
          timer = undefined
          func.apply(option.context, ...arg)
        }, time)
      } else if (now - previous > time) {
        func.apply(option.context, ...arg)
        previous = now
      } else if (option.trailing) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(option.context, ...arg)
        }, time)
      }
    }

    CLEAR_TIMER_OPERATOR.THROTTLES[name] = _throttle.cancel = () => {
      previous = 0
      clearTimeout(timer)
      timer = undefined
    }

    // 重写 function ...params 为原 function 参数
    descriptor.value = function (...params: any) {
      // 获取当前 this
      let _this = this
      // 更改运行时的节流函数 this 指向
      configs.option.context = _this
      //@ts-ignore
      _throttle(params)
    }
  }
}

export function Override(target, name, descriptor) {
  console.log(target)
}
