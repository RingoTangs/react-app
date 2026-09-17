import { createRouter } from '@tanstack/react-router'
import { routeTree } from '@/routeTree.gen'
import { queryClient } from './queryClient'

// 在模块顶层创建路由，避免组件重新渲染时重复创建。
export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent', // hover/touch 时提前加载 route

  /*
   * 将 Router 的 preload 数据新鲜时间设为 0。
   *
   * 项目使用 TanStack Query 管理服务端数据缓存，因此 Router 不负责判断
   * preload 数据是否仍然 fresh；真正导航时允许再次执行 loader，
   * 再由 QueryClient 根据 query 的 staleTime 决定是否需要重新发起请求。
   *
   * 注意：loader 再次执行不代表一定会再次发送网络请求。
   * 该配置只影响 preload 数据的 freshness，不会关闭缓存。
   */
  defaultPreloadStaleTime: 0,

  /*
   * 启用路由滚动位置恢复。
   *
   * Router 会记录每个 history entry 的滚动位置，
   * 用户通过浏览器 Back / Forward 返回页面时，
   * 自动恢复到离开前的位置。
   *
   * 注意：普通 Link / navigate 创建的新导航默认仍会滚到顶部，
   * 它和“恢复历史页面滚动位置”是两种不同的行为。
   */
  scrollRestoration: true,
})
