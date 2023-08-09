export type SidebarItem = {
  to: { name: string; params?: Record<string, string> }
  label: string
  icon: string
}

export const sidebarItems: SidebarItem[] = [
  {
    icon: 'mdi-progress-clock',
    label: 'Chamados em andamento',
    to: { name: 'ticket-list', params: { ticketStatus: 'in-progress' } }
  },
  {
    icon: 'mdi-check-circle-outline',
    label: 'Chamados concluídos',
    to: { name: 'ticket-list', params: { ticketStatus: 'done' } }
  },
  {
    icon: 'mdi-folder-outline',
    label: 'Todos os chamados',
    to: { name: 'ticket-list', params: { ticketStatus: 'all' } }
  }
]
