import { ref, watch } from 'vue'

/**
 * Composable que retrasa la actualización de un valor reactivo.
 * @param {import('vue').Ref} sourceRef - Ref de origen (ej. search)
 * @param {number} delay - Tiempo en ms (default: 300)
 */
export function useDebounce(sourceRef, delay = 300) {
  const debouncedValue = ref(sourceRef.value)
  let timeoutId = null

  // watch escucha cambios reactivos (equivalente a useEffect vigilando una variable)
  watch(sourceRef, (newValue) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      debouncedValue.value = newValue
    }, delay)
  })

  return debouncedValue
}