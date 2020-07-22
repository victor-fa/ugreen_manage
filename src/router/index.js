import Vue from 'vue'
import {checkAuthorization} from '@/utils/request'
import Router from 'vue-router'
import PageView from '@/layouts/PageView'
import TabsView from '@/layouts/tabs/TabsView'
import Login from '@/pages/login/Login'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: Login
    },
    {
      path: '/',
      name: '首页',
      component: TabsView,
      redirect: '/login',
      children: [
        {
          path: 'list',
          name: '列表页',
          meta: {
            icon: 'table'
          },
          component: PageView,
          children: [
            {
              path: 'query',
              name: '查询表格',
              component: () => import('@/pages/list/QueryList'),
            },
            {
              path: 'primary',
              name: '标准列表',
              component: () => import('@/pages/list/StandardList'),
            }
          ]
        }
      ]
    }
  ]
})

// 登录拦截
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !checkAuthorization()) {
    next({path: '/login'})
  } else {
    next()
  }
})

export default router
