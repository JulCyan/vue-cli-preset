
// Router ------------------------------------------------------
export type IRoutes = any

// 导航菜单路由
export const NavMenuRoutes: IRoutes = []

// 内部菜单路由
export const InteriorRoutes: IRoutes = []

// 无需登录可以访问的路由
export const NoVerifyRoutes: IRoutes = []

export const VerifyRoutes = {
  ...NavMenuRoutes,
  ...InteriorRoutes
}

export const Routes = {
  ...NavMenuRoutes,
  ...NoVerifyRoutes,
  ...InteriorRoutes
}

// Layout Routes
export const RoutesLayoutDefault = []
export const RoutesLayoutOnlyShow = []
export const RoutesLayoutEmpty = []

