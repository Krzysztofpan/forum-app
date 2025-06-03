'use client'

import * as React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar' // dostosuj ścieżkę importu

export function ResponsiveSidebar() {
  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar side="left" className="w-64">
        <SidebarHeader>
          <div className="p-4 font-bold text-lg">Moje Menu</div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <div>Strona główna</div>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <div>Profil</div>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <div>Ustawienia</div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter>
          <div className="p-4 text-sm text-muted-foreground">
            © 2025 Moja Aplikacja
          </div>
        </SidebarFooter>

        {/* Przycisk otwierający sidebar na małych ekranach */}
        <SidebarTrigger className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </SidebarTrigger>
      </Sidebar>
    </SidebarProvider>
  )
}
