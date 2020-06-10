import { ESNext } from '../../../../src/plugins/utils'
describe('ESNext method sortBy', () => {
  const method = new ESNext().sortBy
  let resource: Array<any> = [
    { id: 0, name: 'abb' },
    { id: -1, name: 'abc' },
    { id: 1, name: 'aab' }
  ]
  const executionMethod = (arr: Array<any>, sortFn) => {
    return arr.sort(sortFn)
  }
  describe('1.键值为数字', () => {
    it('①升序', () => {
      expect(executionMethod(resource, method({ attr: 'id', rev: true }))).toEqual([
        { id: -1, name: 'abc' },
        { id: 0, name: 'abb' },
        { id: 1, name: 'aab' }
      ])
    })

    it('②降序', () => {
      expect(executionMethod(resource, method({ attr: 'id', rev: false }))).toEqual([
        { id: 1, name: 'aab' },
        { id: 0, name: 'abb' },
        { id: -1, name: 'abc' }
      ])
    })
  })

  describe('2.键值为字符', () => {
    it('①升序', () => {
      expect(executionMethod(resource, method({ attr: 'name', rev: true }))).toEqual([
        { id: 1, name: 'aab' },
        { id: 0, name: 'abb' },
        { id: -1, name: 'abc' }
      ])
    })

    it('②降序', () => {
      expect(executionMethod(resource, method({ attr: 'name', rev: false }))).toEqual([
        { id: -1, name: 'abc' },
        { id: 0, name: 'abb' },
        { id: 1, name: 'aab' }
      ])
    })
  })
})
