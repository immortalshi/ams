import Vue from 'vue'
import Router from 'vue-router'
import LeftMenu from '@/components/LeftMenu'
import index from '@/components/index'
import articles from '@/components/articles'
import write from '@/components/write'
import collect from '@/components/collect'
import check from '@/components/check'
import login from '@/components/login'
import register from '@/components/register'
import searchArticles from '@/components/searchArticles'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/LeftMenu',
      name: 'LeftMenu',
      component: LeftMenu,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/articles',
      name: 'articles',
      component: articles,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/write',
      name: 'write',
      component: write,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/collect',
      name: 'collect',
      component: collect,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/check',
      name: 'check',
      component: check,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/searchArticles',
      name: 'searchArticles',
      component: searchArticles,
      meta: {
        keepAlive: true
      }
    }
  ]
})
export default router
