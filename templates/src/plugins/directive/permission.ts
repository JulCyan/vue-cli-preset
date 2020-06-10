import store from '@/plugins/store'
import { PermissionDirective } from '@/plugins/utils'

export const getRolesSum = (): number => {
  return 1
}

export const haveRolesPermission = (binding: any): boolean => {
  const pd = new PermissionDirective(binding)
  let showFlag = false
  // 获取用户权限合集
  const controlSum = getRolesSum()
  // 拆分用户权限
  let controlList = PermissionDirective.turnToBinaryPermissionSum(controlSum)
  // 找到拥有权限的一项
  controlList.find(item => (showFlag = pd.result(item)))
  return showFlag
}

// directive functions
export default {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el: any, binding: any) {
    let showFlag = haveRolesPermission(binding)
    !showFlag && el.parentNode.removeChild(el)
  }
}
