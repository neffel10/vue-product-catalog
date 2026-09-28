<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductStore } from '../stores/productStore'
import ProductTableRow from '../components/ProductTableRow.vue'
import ProductModal from '../components/ProductModal.vue'

const store = useProductStore()
const { 
  filteredProducts, 
  categories, 
  search, 
  selectedCategory, 
  isLoading, 
  errorMessage 
} = storeToRefs(store)

const { fetchProducts, toggleStatus, deleteProduct, addProduct } = store
const isModalOpen = ref(false)

onMounted(() => {
  if (store.products.length === 0) {
    fetchProducts()
  }
})
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-6">
    <!-- Encabezado con Botón Crear -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-5 gap-4">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-white">Catálogo de Productos</h1>
        <p class="text-sm text-slate-400 mt-1">Gestión de inventario con Pinia y Vue Router</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="text-xs bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg text-slate-300 font-mono">
          Total: {{ filteredProducts.length }}
        </div>
        <button 
          @click="isModalOpen = true"
          class="px-4 py-2 bg-vue-primary hover:bg-vue-dark text-slate-950 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
        >
          + Nuevo Producto
        </button>
      </div>
    </div>

    <!-- Barra de Filtros -->
    <div class="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900 p-4 rounded-xl border border-slate-800">
      <input 
        v-model="search"
        type="text" 
        placeholder="Buscar por título..." 
        class="w-full sm:w-80 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-vue-primary"
      />

      <div class="flex flex-wrap gap-2">
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="selectedCategory = cat"
          :class="[
            'px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors cursor-pointer',
            selectedCategory === cat 
              ? 'bg-vue-primary text-slate-950 font-semibold' 
              : 'bg-slate-800 text-slate-400 hover:text-slate-200'
          ]"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- Estado: Cargando -->
    <div v-if="isLoading" class="p-12 text-center text-slate-400 bg-slate-900/50 rounded-xl border border-slate-800">
      <div class="inline-block w-6 h-6 border-2 border-vue-primary border-t-transparent rounded-full animate-spin mb-3"></div>
      <p class="text-sm">Cargando catálogo...</p>
    </div>

    <!-- Estado: Error -->
    <div v-else-if="errorMessage" class="p-6 text-center text-rose-400 bg-rose-950/20 border border-rose-900/50 rounded-xl">
      <p class="text-sm">{{ errorMessage }}</p>
      <button 
        @click="fetchProducts" 
        class="mt-3 px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium rounded-lg cursor-pointer"
      >
        Reintentar
      </button>
    </div>

    <!-- Tabla -->
    <div v-else class="bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
      <table class="w-full text-left text-sm min-w-[650px]">
        <thead class="bg-slate-950/60 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
          <tr>
            <th class="px-6 py-3">Producto</th>
            <th class="px-6 py-3">Categoría</th>
            <th class="px-6 py-3">Precio</th>
            <th class="px-6 py-3">Stock</th>
            <th class="px-6 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800">
          <ProductTableRow 
            v-for="item in filteredProducts" 
            :key="item.id"
            :item="item"
            @toggle-status="toggleStatus"
            @delete-item="deleteProduct"
          />

          <tr v-if="filteredProducts.length === 0">
            <td colspan="5" class="px-6 py-12 text-center text-slate-500">
              No hay productos que coincidan con "{{ search }}".
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <ProductModal 
      :is-open="isModalOpen"
      :categories="categories"
      @close="isModalOpen = false"
      @add-product="addProduct"
    />
  </div>
</template>