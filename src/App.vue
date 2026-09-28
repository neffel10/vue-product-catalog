<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 font-sans">
    <!-- Navbar global con acento Vue -->
    <header class="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-2 text-vue-primary font-bold text-lg hover:brightness-110 transition-all">
          <span>⚡ VueCatalog</span>
        </RouterLink>

        <nav class="flex items-center gap-4 text-sm">
          <RouterLink 
            to="/" 
            class="text-slate-300 hover:text-white transition-colors"
            active-class="text-vue-primary font-medium"
          >
            Catálogo
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="p-8">
      <RouterView />
    </main>
  </div>
</template>