import { IRequestFunc } from '@/configs/interface'
export const demoRequest: IRequestFunc = (data) => ({
  method: 'post',
  url: `demo`,
  data
})