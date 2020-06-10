export interface IState {
  [propsName: string]: any
}

export interface IMutations {
  // 统一 state 修改方法
  stateChange: (state: IState, { type, val }: { type: string, val: any }) => void
  [propsName: string]: any
}

export interface IActions {
  [propsName: string]: any
}

export interface IModules {
  [propName: string]: any
}

// 使用 vuex-class 的 decorator 时方法的接口
export interface IMutationsInstance {
  stateChange: ({ type, val }: { type: string, val: any }) => void,
}

export interface IStore {
  state: IState,
  mutations: IMutations,
  actions: IActions,
  modules: IModules
}