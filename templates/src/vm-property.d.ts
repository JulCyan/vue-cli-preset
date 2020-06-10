import { Utils } from '@/plugins/utils'
import { AxiosRequestConfig } from 'axios'
import { IExtentionAxiosPromise } from '@/configs/interface'
declare module 'vue/types/vue' {
  interface Vue {
    $utils: Utils
    $axios: (config: AxiosRequestConfig) => IExtentionAxiosPromise
  }
}
