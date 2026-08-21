import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../adminSidebar/AdminSidebar'
import './layout.scss'
export default function AdminLayout() {
  return (
    <>
     <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <Outlet />
      </div>
     </div>
    </>
  )
}
