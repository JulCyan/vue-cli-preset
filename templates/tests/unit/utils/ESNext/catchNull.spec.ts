import { ESNext } from '../../../../src/plugins/utils'
describe('ESNext method catchNull', () => {
  const method = new ESNext().catchNull
  let resource: any
  describe('1.数据结构为纯对象', () => {
    describe('1)每个键都有值', () => {
      it('①尾键正常值', () => {
        resource = {
          detail: {
            name: {
              firstName: 'Jack'
            }
          }
        }
        expect(method(resource, 'detail.name.firstName', '')).toBe('Jack')
      })

      it('②尾键值为 \'\'', () => {
        resource = {
          detail: {
            name: {
              firstName: ''
            }
          }
        }
        expect(method(resource, 'detail.name.firstName', 'Jack')).toBe('')
      })

      it('③尾键值为 null', () => {
        resource = {
          detail: {
            name: {
              firstName: null
            }
          }
        }
        expect(method(resource, 'detail.name.firstName', 'Jack')).toBe('Jack')
      })
    })

    describe('2)中间某一个键空值', () => {
      it('①空键值为 Null', () => {
        resource = {
          detail: {
            name: null
          }
        }
        expect(method(resource, 'detail.name.firstName', 'Jack')).toBe('Jack')
      })

      it('②空键值为 \'\'', () => {
        resource = {
          detail: {
            name: ''
          }
        }
        expect(method(resource, 'detail.name.firstName', 'Jack')).toBe('Jack')
      })
    })
  })

  describe('2.数据结构为纯数组', () => {
    describe('1)每个键都有值', () => {
      it('①尾键正常值', () => {
        resource = [1, [2, 2, [3, 2, 3, 'Jack']]]
        expect(method(resource, '[1][2][3]', '')).toBe('Jack')
      })

      it('②尾键值为 \'\'', () => {
        resource = [1, [2, 2, [3, 2, 3, '']]]
        expect(method(resource, '[1][2][3]', 'Jack')).toBe('')
      })

      it('③尾键值为 null', () => {
        resource = [1, [2, 2, [3, 2, 3, null]]]
        expect(method(resource, '[1][2][3]', 'Jack')).toBe('Jack')
      })
    })

    describe('2)中间某一个键空值', () => {
      it('①空键值为 Null', () => {
        resource = [1, [2, 2, null]]
        expect(method(resource, '[1][2][3]', 'Jack')).toBe('Jack')
      })

      it('②空键值为 \'\'', () => {
        resource = [1, [2, 2, '']]
        expect(method(resource, '[1][2][3]', 'Jack')).toBe('Jack')
      })
    })
  })

  describe('3.数据结构为对象和数组', () => {
    describe('1)数组前对象后', () => {
      describe('1.1)每个键都有值', () => {
        it('①尾键正常值', () => {
          resource = [1, [2, 2, { name: { firstName: 'Jack' } }]]
          expect(method(resource, '[1][2].name.firstName', '')).toBe('Jack')
        })

        it('②尾键值为 \'\'', () => {
          resource = [1, [2, 2, { name: { firstName: '' } }]]
          expect(method(resource, '[1][2].name.firstName', 'Jack')).toBe('')
        })

        it('③尾键值为 null', () => {
          resource = [1, [2, 2, { name: { firstName: null } }]]
          expect(method(resource, '[1][2].name.firstName', 'Jack')).toBe('Jack')
        })
      })

      describe('1.2)中间某一个键空值', () => {

        it('①空键值为 Null', () => {
          resource = [1, [2, 2, { name: null }]]
          expect(method(resource, '[1][2].name.firstName', 'Jack')).toBe('Jack')
        })

        it('②空键值为 \'\'', () => {
          resource = [1, [2, 2, { name: '' }]]
          expect(method(resource, '[1][2].name.firstName', 'Jack')).toBe('Jack')
        })
      })
    })

    describe('1)对象前数组后', () => {
      describe('1.1)每个键都有值', () => {
        it('①尾键正常值', () => {
          resource = { detail: { name: [1, 2, { firstName: 'Jack' }] } }
          expect(method(resource, 'detail.name[2].firstName', '')).toBe('Jack')
        })
      })

      describe('1.2)中间某一个键空值', () => {

        it('①空键值为 Null', () => {
          resource = { detail: { name: [1, 2, null] } }
          expect(method(resource, 'detail.name[2].firstName', 'Jack')).toBe('Jack')
        })
      })
    })
  })
})
