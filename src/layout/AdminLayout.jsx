import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../adminSidebar/AdminSidebar'
export default function AdminLayout() {
  return (
    <>
     <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 overflow-y-auto bg-[#f9fafb]">
        <Outlet />
      </div>
     </div>
    </>
  )
}
