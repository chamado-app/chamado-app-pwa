import { defineStore } from 'pinia'

export type TogglesState = {
  sidebar?: boolean
}

export const useTogglesStore = defineStore('toggles', {
  state: (): TogglesState => ({ sidebar: undefined }),
  actions: {
    toggleSidebar() {
      this.sidebar = !this.sidebar
    }
  }
})
