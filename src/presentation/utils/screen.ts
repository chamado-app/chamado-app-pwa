import { useQuasar } from 'quasar'
import { type ComputedRef, computed } from 'vue'

export const useIsMobile = (): ComputedRef<boolean> => {
  const quasar = useQuasar()
  const isMobile = computed(() => quasar.screen.lt.md)
  return isMobile
}

export const useScrollToTop =
  (behavior: ScrollBehavior = 'smooth'): (() => void) =>
  (): void => {
    window.scrollTo({ top: 0, behavior })
  }
