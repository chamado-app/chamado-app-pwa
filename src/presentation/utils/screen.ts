import { useQuasar } from 'quasar'
import { type ComputedRef, computed } from 'vue'

export const useIsMobile = (): ComputedRef<boolean> => {
  const quasar = useQuasar()
  const isMobile = computed(() => quasar.screen.lt.md)
  return isMobile
}
