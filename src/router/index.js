import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/epidemicMap',
    children: [
      {
        path: 'epidemicMap',
        component: () => import('@/views/epidemicMap/index'),
        name: 'epidemicMap',
        meta: { title: '疫情地图', icon: 'dashboard', affix: true }
      }
    ]
  }
]
export const asyncRoutes = [
  {
    path: '/epidemicLine',
    component: Layout,
    redirect: '/epidemicLine',
    children: [
      {
        path: 'epidemicLine',
        component: () => import('@/views/epidemicLine/index'),
        name: 'epidemicLine',
        meta: { title: '疫情折线统计图', icon: 'edit', roles: ['admin', 'editor'] }
      }
    ]
  },
  {
    path: '/epidemic',
    component: Layout,
    redirect: '/epidemic',
    meta: { title: '疫情管理', icon: 'documentation', roles: ['admin', 'editor'] },
    children: [
      {
        name: 'confirmPerson',
        path: 'ConfirmPersonList',
        component: () => import('@/views/epidemic/ConfirmPersonList'),
        meta: { title: '确诊人员', icon: 'list', roles: ['admin'] }
      },
      {
        name: 'editConfirmPerson',
        path: 'ConfirmPersonForm/edit/:confirmPersonId',
        component: () => import('@/views/epidemic/ConfirmPersonForm'),
        meta: { title: '修改确诊人员', icon: 'edit', roles: ['admin'] },
        hidden: true
      },
      {
        name: 'addConfirmPerson',
        path: 'ConfirmPersonForm/add',
        component: () => import('@/views/epidemic/ConfirmPersonForm'),
        meta: { title: '增加确诊人员', icon: 'add', roles: ['admin'] },
        hidden: true
      },
      {
        name: 'suspectPerson',
        path: 'SuspectPersonList',
        component: () => import('@/views/epidemic/SuspectPersonList'),
        meta: { title: '疑似人员', icon: 'list', roles: ['admin'] }
      },
      {
        name: 'editSuspectPerson',
        path: 'SuspectPersonForm/edit/:suspectPersonId',
        component: () => import('@/views/epidemic/SuspectPersonForm'),
        meta: { title: '修改疑似人员', icon: 'edit', roles: ['admin'] },
        hidden: true
      },
      {
        name: 'addSuspectPerson',
        path: 'SuspectPersonForm/add',
        component: () => import('@/views/epidemic/SuspectPersonForm'),
        meta: { title: '增加疑似人员', icon: 'add', roles: ['admin'] },
        hidden: true
      }

    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
