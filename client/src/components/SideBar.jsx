import { Link, NavLink } from 'react-router-dom';
import { X } from 'lucide-react';

const links = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Availability', path: '/dashboard/availability' },
  { name: 'Bookings', path: '/dashboard/bookings' },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Backdrop (mobile only) */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:static z-40
          top-0 left-0 
          h-screen md:h-auto 
          w-64
          bg-white/5 backdrop-blur-xl
          border-r border-white/10
          px-6 py-8
          transform transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(34,197,94,0.8)]" />
            <Link
              to="/"
              className="text-lg font-semibold text-white tracking-tight"
            >
              Avail
            </Link>
          </div>

          {/* Close button (mobile) */}
          <button
            onClick={onClose}
            className="md:hidden text-white/60 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="space-y-2">
          {links.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              end
              onClick={onClose}
              className={({ isActive }) =>
                `
                  block rounded-lg px-4 py-2 text-sm transition
                  ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }
                `
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
