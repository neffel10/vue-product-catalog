<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle-status', 'delete-item'])
</script>

<template>
  <tr class="hover:bg-slate-800/40 transition-colors">
    <td class="px-6 py-4 font-medium text-slate-200">
      <div class="flex items-center gap-3">
        <img 
          :src="item.image" 
          :alt="item.title"
          class="w-10 h-10 object-contain rounded bg-white p-1"
        />
        <!-- Enlace dinámico al detalle -->
        <RouterLink 
          :to="{ name: 'product-detail', params: { id: item.id } }"
          class="line-clamp-1 max-w-xs hover:text-indigo-400 transition-colors"
        >
          {{ item.title }}
        </RouterLink>
      </div>
    </td>
    <td class="px-6 py-4 capitalize text-slate-400">
      {{ item.category }}
    </td>
    <td class="px-6 py-4 text-slate-300 font-mono">
      ${{ item.price.toFixed(2) }}
    </td>
    <td class="px-6 py-4">
      <span 
        :class="[
          'px-2.5 py-0.5 text-xs rounded-full font-medium',
          item.inStock 
            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
            : 'bg-rose-950 text-rose-400 border border-rose-800'
        ]"
      >
        {{ item.inStock ? 'Disponible' : 'Agotado' }}
      </span>
    </td>
    <td class="px-6 py-4 text-right space-x-3">
      <button 
        @click="emit('toggle-status', item.id)"
        class="text-xs text-indigo-400 hover:text-indigo-300 transition-colors underline cursor-pointer"
      >
        Alternar stock
      </button>
      <button 
        @click="emit('delete-item', item.id)"
        class="text-xs text-rose-400 hover:text-rose-300 transition-colors underline cursor-pointer"
      >
        Eliminar
      </button>
    </td>
  </tr>
</template>