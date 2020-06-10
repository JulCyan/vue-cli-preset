import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface IRequestFunc {
    (...args: any): AxiosRequestConfig
}

export interface IFormValidate {
    (rule: any, value: any, callback: any): void;
}

export interface IDirectiveBinding {
    arg: string
    value: number | Array<number>
    name: string
    rawName: string
    modifiers: any
    [propName: string]: any
}

// 重写 AxiosResponse
export interface IExtentionAxiosResponse<T> extends AxiosResponse<T> {
    code: number
    message: string
    state: boolean
}

export interface IExtentionAxiosPromise<T = any> extends Promise<IExtentionAxiosResponse<T>> {}
