import { createRouter, createWebHistory } from 'vue-router'
import CatalogView from '../views/CatalogView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'

const routes = [
  {
    path: '/',
    name: 'catalog',
    component: CatalogView
  },
  {
    path: '/producto/:id',
    name: 'product-detail',
    component: ProductDetailView,
    props: true // Pasa el parámetro id como prop directo al componente
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router