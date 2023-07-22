import { defineStore } from 'pinia'

type Store = {
  sidebar?: boolean
}

export const useToggles = defineStore('toggles', {
  state: (): Store => ({ sidebar: undefined }),
  actions: {
    toggleSidebar() {
      this.sidebar = !this.sidebar
    }
  }
})
