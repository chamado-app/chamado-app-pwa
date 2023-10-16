export type SidebarItem = {
  to: { name: string; params?: Record<string, string> }
  label: string
  icon: string
}

export const sidebarItems: SidebarItem[] = [
  {
    icon: 'mdi-tag-multiple-outline',
    label: 'Chamados',
    to: { name: 'list-tickets' }
  }
]
