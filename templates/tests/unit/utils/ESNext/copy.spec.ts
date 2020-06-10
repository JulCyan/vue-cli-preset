import { ESNext } from '../../../../src/plugins/utils'
describe('ESNext method copy', () => {
  const method = new ESNext().copy
  let resource: any

  it('①对象', () => {
    resource = {
      name: 'cyan',
      detail: {
        cards: [1, 3],
        leavel: 3
      }
    }
    expect(method(resource)).toEqual({
      name: 'cyan',
      detail: {
        cards: [1, 3],
        leavel: 3
      }
    })
  })

  it('②数组', () => {
    resource = [{ cards: [1, 2], family: [{ name: '李四', age: 18, cards: [4, 3, 2] }] }]
    expect(method(resource)).toEqual([{ cards: [1, 2], family: [{ name: '李四', age: 18, cards: [4, 3, 2] }] }])
  })
})
