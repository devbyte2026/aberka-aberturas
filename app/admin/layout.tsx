'use client'

import { usePathname } from 'next/navigation'
import Sidebar from '@/components/admin/Sidebar'
import Link from 'next/link'
import { LayoutPanelTop } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLogin = pathname === '/admin'

  if (isLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6" style={{ backgroundColor: '#1A2A4A' }}>
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
          <div className="flex flex-col items-center mb-5 sm:mb-6">
            <Link href="/" className="flex flex-col items-center mb-3">
              <LayoutPanelTop size={36} className="text-primary mb-2" style={{ color: '#2C3E6B' }} />
              <h1 className="text-lg sm:text-xl font-bold text-foreground">Aberka Admin</h1>
            </Link>
            <p className="text-muted text-xs sm:text-sm mt-1">Panel de administración</p>
          </div>
          <div className="border-t border-border mb-5" />
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen overflow-x-hidden" style={{ backgroundColor: '#F8F9FB' }}>
      <Sidebar />
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0 p-3 sm:p-4 lg:p-6 overflow-x-hidden">
        <div className="mt-4 lg:mt-0">
          {children}
        </div>
      </main>
    </div>
  )
}