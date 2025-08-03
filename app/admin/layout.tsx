"use client"

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { initializeAuthSystem } from '@/lib/auth'
import Sidebar from '@/components/admin/Sidebar'
import { Topbar } from '@/components/admin/Topbar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}
