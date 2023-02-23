import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/front/HomeView.vue')
      },
      {
        path: 'products',
        component: () => import('../views/front/ProductsView.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/front/ProductView.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/front/CartView.vue')

      },
      {
        path: 'login',
        component: () => import('../views/front/LoginView.vue')

      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/BackView.vue'),
    children: [
      {
        path: 'backProducts',
        component: () => import('../views/back/BackProducts.vue')
      },
      {
        path: 'backOders',
        component: () => import('../views/back/BackOders.vue')
      }
    ]
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
