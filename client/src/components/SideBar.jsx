import { Link, NavLink } from 'react-router-dom';

const links = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Availability', path: '/dashboard/availability' },
  { name: 'Bookings', path: '/dashboard/bookings' },
];

export default function Sidebar() {
  return (
    <aside
      className="
        w-64
        border-r border-white/10
        bg-white/5
        backdrop-blur-xl
        px-6 py-8
      "
    >
      {/* Brand */}
      <div  className="flex items-center gap-2 mb-12">
        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(34,197,94,0.8)]" />
        <Link to="/" className="text-lg font-semibold text-white cursor-pointer tracking-tight">
          Avail
        </Link>
      </div>

      {/* Nav */}
      <nav className="space-y-2">
        {links.map(link => (
          <NavLink
            key={link.path}
            to={link.path}
            end
            className={({ isActive }) =>
              `
              block rounded-lg px-4 py-2 text-sm
              transition
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
  );
}
