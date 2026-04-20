'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  LogOut,
  ChevronRight,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  logout: () => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const navItems = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
    emoji: '📊'
  },
  {
    label: 'Products',
    href: '/admin/products',
    icon: Package,
    emoji: '📱'
  },
  {
    label: 'Categories',
    href: '/admin/categories',
    icon: Tags,
    emoji: '🏷️'
  }
]

export default function AdminSidebar({ logout, isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-50 w-72 h-screen bg-white border-r border-gray-200 flex flex-col shadow-[rgba(0,0,0,0.05)_5px_0_15px_-5px] transition-transform duration-300 md:relative md:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      {/* Brand Header */}
      <div className="p-8 border-b border-gray-100 flex flex-col gap-1 relative">
        <h1 className="text-2xl font-black bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Balusi Admin
        </h1>
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
          Management Console
        </p>
        <button 
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-6 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 ease-in-out",
                isActive 
                  ? "bg-blue-50/80 text-primary shadow-sm" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <div className="flex items-center gap-3.5">
                <div className={cn(
                  "p-2 rounded-lg transition-colors duration-300",
                  isActive ? "bg-primary text-white" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                )}>
                  <Icon size={18} strokeWidth={2.5} />
                </div>
                <span className="font-semibold text-sm tracking-tight">{item.label}</span>
              </div>
              
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-6 border-t border-gray-100 bg-gray-50/30">
        <button
          onClick={logout}
          className="w-full flex items-center justify-between gap-2 px-5 py-3 bg-white text-rose-500 border border-rose-100 rounded-xl hover:bg-rose-50 hover:border-rose-200 transition-all duration-300 font-bold text-sm shadow-sm hover:shadow-md group"
        >
          <div className="flex items-center gap-3">
            <span className="p-1.5 bg-rose-50 rounded-lg group-hover:bg-rose-100 transition-colors">
              <LogOut size={16} strokeWidth={2.5} />
            </span>
            Logout
          </div>
          <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
        </button>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </aside>
  )
}
