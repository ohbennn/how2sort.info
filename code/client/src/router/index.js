import Vue from 'vue'
import Router from 'vue-router'
import MainSearchPage from '@/components/MainSearchPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainSearchPage',
      component: MainSearchPage
    }
  ]
})
