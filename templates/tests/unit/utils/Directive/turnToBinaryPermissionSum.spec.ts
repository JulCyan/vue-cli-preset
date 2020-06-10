import { PermissionDirective } from './../../../../src/plugins/utils'
describe('PermissionDirective method turnToBinaryPermissionSum', () => {
  const method = PermissionDirective.turnToBinaryPermissionSum
  const reduce = (arr) => {
    return arr.reduce((result, item) => result + item, 0)
  }
  let resource: any
  it('①Number', () => {
    resource = [1, 2, 4, 32]
    expect(method(reduce(resource))).toEqual([1, 2, 4, 32])
  })

  it('②String', () => {
    resource = '11'
    expect(method(resource)).toEqual([1, 2, 8])
  })
})
