import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import axios from 'axios'

export const useProductStore = defineStore('products', () => {
  // Inicializamos leyendo de localStorage si existe
  const savedProducts = localStorage.getItem('vue_catalog_products')
  const products = ref(savedProducts ? JSON.parse(savedProducts) : [])
  
  const isLoading = ref(false)
  const errorMessage = ref(null)
  const search = ref('')
  const selectedCategory = ref('todos')

  // Auto-guardado en localStorage ante cualquier mutación profunda
  watch(
    products,
    (newVal) => {
      localStorage.setItem('vue_catalog_products', JSON.stringify(newVal))
    },
    { deep: true }
  )

  const categories = computed(() => {
    const cats = new Set(products.value.map(p => p.category))
    return ['todos', ...Array.from(cats)]
  })

  const filteredProducts = computed(() => {
    return products.value.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(search.value.toLowerCase())
      const matchesCategory = selectedCategory.value === 'todos' || item.category === selectedCategory.value
      return matchesSearch && matchesCategory
    })
  })

  const fetchProducts = async () => {
    // Si ya tenemos datos persistidos en local, no gastamos la petición de red
    if (products.value.length > 0) return

    isLoading.value = true
    errorMessage.value = null
    try {
      const res = await axios.get('https://dummyjson.com/products?limit=15')
      products.value = res.data.products.map(p => ({
        id: p.id,
        title: p.title,
        description: p.description,
        category: p.category,
        price: p.price,
        image: p.thumbnail,
        rating: p.rating,
        brand: p.brand,
        inStock: p.stock > 0
      }))
    } catch (err) {
      errorMessage.value = 'Ocurrió un error al cargar el catálogo de productos.'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  const addProduct = (newProduct) => {
    products.value.unshift(newProduct)
  }

  const toggleStatus = (id) => {
    const item = products.value.find(p => p.id === id)
    if (item) item.inStock = !item.inStock
  }

  const deleteProduct = (id) => {
    products.value = products.value.filter(p => p.id !== id)
  }

  // Opción para resetear a datos frescos de la API
  const resetToApi = async () => {
    localStorage.removeItem('vue_catalog_products')
    products.value = []
    await fetchProducts()
  }

  return {
    products,
    isLoading,
    errorMessage,
    search,
    selectedCategory,
    categories,
    filteredProducts,
    fetchProducts,
    addProduct,
    toggleStatus,
    deleteProduct,
    resetToApi
  }
})