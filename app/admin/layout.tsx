"use client"

import React from "react"

import type { ReactNode } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import Sidebar from "@/components/admin/Sidebar"
import { Topbar } from "@/components/admin/Topbar"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get activeTab from URL search params, default to "dashboard"
  const initialTab = searchParams.get("tab") || "dashboard"
  const [activeTab, setActiveTab] = React.useState(initialTab)

  // Update URL when activeTab changes
  React.useEffect(() => {
    const currentSearchParams = new URLSearchParams(searchParams.toString())
    if (activeTab && currentSearchParams.get("tab") !== activeTab) {
      currentSearchParams.set("tab", activeTab)
      router.replace(`${pathname}?${currentSearchParams.toString()}`)
    }
  }, [activeTab, pathname, router, searchParams])

  // Update activeTab when URL search params change (e.g., browser back/forward)
  React.useEffect(() => {
    const tabFromUrl = searchParams.get("tab")
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl)
    } else if (!tabFromUrl && activeTab !== "dashboard") {
      setActiveTab("dashboard")
    }
  }, [searchParams, activeTab])

  // Clone children to pass activeTab prop
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { activeTab } as { activeTab: string })
    }
    return child
  })

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Suspense fallback={<div>Loading...</div>}>
            <SidebarInset>
              <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar activeTab={activeTab} setActiveTab={setActiveTab} />
                {childrenWithProps}
              </div>
            </SidebarInset>
          </Suspense>
        </div>
      </div>
    </SidebarProvider>
  )
}
