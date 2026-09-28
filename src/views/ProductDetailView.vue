<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../stores/productStore'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const store = useProductStore()

const product = ref(null)
const isLoading = ref(true)
const errorMessage = ref(null)

const productId = route.params.id

onMounted(async () => {
  isLoading.value = true
  // 1. Intentar sacarlo de Pinia si ya estaba cargado
  const existing = store.products.find(p => String(p.id) === String(productId))
  
  if (existing) {
    product.value = existing
    isLoading.value = false
  } else {
    // 2. Si el usuario recargó la página directamente en /producto/X, lo pedimos a la API
    try {
      const res = await axios.get(`https://dummyjson.com/products/${productId}`)
      product.value = {
        id: res.data.id,
        title: res.data.title,
        description: res.data.description,
        category: res.data.category,
        price: res.data.price,
        image: res.data.thumbnail,
        rating: res.data.rating,
        brand: res.data.brand,
        inStock: res.data.stock > 0
      }
    } catch (err) {
      errorMessage.value = 'No se encontró el producto solicitado.'
    } finally {
      isLoading.value = false
    }
  }
})
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Botón volver -->
    <button 
      @click="router.back()"
      class="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium cursor-pointer"
    >
      ← Volver al catálogo
    </button>

    <!-- Cargando -->
    <div v-if="isLoading" class="p-12 text-center text-slate-400 bg-slate-900 rounded-2xl border border-slate-800">
      <div class="inline-block w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3"></div>
      <p class="text-sm">Cargando detalles del producto...</p>
    </div>

    <!-- Error -->
    <div v-else-if="errorMessage" class="p-6 text-center text-rose-400 bg-rose-950/20 border border-rose-900/50 rounded-xl">
      <p class="text-sm">{{ errorMessage }}</p>
    </div>

    <!-- Ficha del Producto -->
    <div v-else-if="product" class="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div class="bg-white p-6 rounded-xl flex items-center justify-center min-h-[260px]">
        <img 
          :src="product.image" 
          :alt="product.title"
          class="max-h-64 object-contain"
        />
      </div>

      <div class="space-y-4">
        <div class="space-y-1">
          <span class="text-xs uppercase tracking-wider text-indigo-400 font-semibold">
            {{ product.category }}
          </span>
          <h1 class="text-2xl font-bold text-white">{{ product.title }}</h1>
        </div>

        <p class="text-sm text-slate-400 leading-relaxed">
          {{ product.description || 'Producto registrado localmente en el catálogo.' }}
        </p>

        <div class="text-3xl font-mono font-bold text-emerald-400">
          ${{ Number(product.price).toFixed(2) }}
        </div>

        <div class="pt-4 border-t border-slate-800 flex items-center gap-4">
          <span 
            :class="[
              'px-3 py-1 text-xs rounded-full font-medium',
              product.inStock 
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                : 'bg-rose-950 text-rose-400 border border-rose-800'
            ]"
          >
            {{ product.inStock ? 'Stock Disponible' : 'Agotado' }}
          </span>

          <span v-if="product.rating" class="text-xs text-amber-400 flex items-center gap-1 font-mono">
            ★ {{ product.rating }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>