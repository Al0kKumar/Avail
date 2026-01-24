import { useState } from 'react';
import Sidebar from '../components/SideBar';
import Topbar from '../components/TopBar';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 px-4 sm:px-10 py-6 sm:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
