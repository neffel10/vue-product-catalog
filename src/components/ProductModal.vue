<script setup>
import { reactive } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  categories: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['close', 'add-product'])

// reactive agrupa el estado de un objeto completo
const form = reactive({
  title: '',
  price: '',
  category: '',
  inStock: true
})

const handleSubmit = () => {
  if (!form.title.trim() || !form.price || !form.category) return

  emit('add-product', {
    id: Date.now(),
    title: form.title,
    price: parseFloat(form.price),
    category: form.category,
    image: 'https://placehold.co/100x100/1e293b/cbd5e1?text=Nuevo',
    inStock: form.inStock
  })

  // Limpiar campos
  form.title = ''
  form.price = ''
  form.category = ''
  form.inStock = true

  emit('close')
}
</script>

<template>
  <!-- Teleport mueve el HTML directamente al body del documento -->
  <Teleport to="body">
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
      @click.self="emit('close')"
    >
      <div class="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-5">
        
        <!-- Cabecera -->
        <div class="flex justify-between items-center border-b border-slate-800 pb-3">
          <h2 class="text-lg font-semibold text-white">Nuevo Producto</h2>
          <button 
            @click="emit('close')"
            class="text-slate-400 hover:text-slate-200 text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        <!-- Formulario -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          
          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1">Nombre o Título</label>
            <input 
              v-model="form.title" 
              type="text" 
              required
              placeholder="Ej. Teclado Mecánico"
              class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-slate-300 mb-1">Precio ($)</label>
              <input 
                v-model.number="form.price" 
                type="number" 
                step="0.01"
                min="0"
                required
                placeholder="29.99"
                class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label class="block text-xs font-medium text-slate-300 mb-1">Categoría</label>
              <select 
                v-model="form.category" 
                required
                class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 capitalize"
              >
                <option value="" disabled>Seleccionar...</option>
                <!-- Filtramos la opción 'todos' -->
                <option 
                  v-for="cat in categories.filter(c => c !== 'todos')" 
                  :key="cat" 
                  :value="cat"
                >
                  {{ cat }}
                </option>
              </select>
            </div>
          </div>

          <div class="flex items-center gap-2 pt-2">
            <input 
              v-model="form.inStock" 
              type="checkbox" 
              id="stock" 
              class="w-4 h-4 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-950 cursor-pointer"
            />
            <label for="stock" class="text-xs text-slate-300 cursor-pointer">Disponible en Stock</label>
          </div>

          <!-- Botones de Acción -->
          <div class="flex justify-end gap-3 pt-3 border-t border-slate-800">
            <button 
              type="button" 
              @click="emit('close')"
              class="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              Guardar Producto
            </button>
          </div>

        </form>

      </div>
    </div>
  </Teleport>
</template>