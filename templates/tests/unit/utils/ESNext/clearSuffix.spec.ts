import { ESNext } from '../../../../src/plugins/utils'
describe('ESNext method clearSuffix', () => {
  const method = new ESNext().clearSuffix
  let resource: string = 'cyan.png'
  it('①正常后缀', () => {
    expect(method(resource)).toBe('cyan')
  })

  it('②无后缀', () => {
    resource = 'cyan'
    expect(method(resource)).toBe('cyan')
  })

  it('②双后缀', () => {
    resource = 'cyan.spec.png'
    expect(method(resource)).toBe('cyan')
  })

  it('②多后缀', () => {
    resource = 'cyan.spec.png.666.sss.ts.jpeg'
    expect(method(resource)).toBe('cyan')
  })
})
