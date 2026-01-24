import Sidebar  from '../components/SideBar';
import Topbar from '../components/TopBar';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="flex-1 px-10 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
