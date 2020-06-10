import { ESNext } from '../../../../src/plugins/utils'
describe('ESNext method removeDuplicates', () => {
  const method = new ESNext().removeDuplicates
  let resource: Array<any>
  it('①正常数据', () => {
    resource = [{ id: 1, name: '张三' }, { id: 2, name: '李四' }, { id: 3, name: '王五' }, { id: 1, name: '张三' }]
    expect(method(resource)).toEqual([{ id: 1, name: '张三' }, { id: 2, name: '李四' }, { id: 3, name: '王五' }])
  })
})
