export type SidebarItem = {
  to: { name: string; params?: Record<string, string> }
  label: string
  icon: string
}

export const sidebarItems: SidebarItem[] = [
  {
    icon: 'mdi-progress-clock',
    label: 'Chamados em andamento',
    to: { name: 'task-list', params: { taskStatus: 'in-progress' } }
  },
  {
    icon: 'mdi-check-circle-outline',
    label: 'Chamados concluídos',
    to: { name: 'task-list', params: { taskStatus: 'completed' } }
  },
  {
    icon: 'mdi-folder-outline',
    label: 'Todos os chamados',
    to: { name: 'task-list', params: { taskStatus: 'all' } }
  }
]
