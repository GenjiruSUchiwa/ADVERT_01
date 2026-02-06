import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Sparkles,
  Wand2,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/wizard', label: 'Nouvelle Strategie', icon: Wand2 },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-800/60 bg-slate-950/95 backdrop-blur-xl">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800/60">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/20">
          <Sparkles className="h-5 w-5 text-slate-950" />
        </div>
        <div>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            ADVERT
          </span>
          <span className="ml-1 text-xs font-medium text-amber-400">MVP</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          Menu
        </div>
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.to);

            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-400'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-amber-400"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon className={`h-[18px] w-[18px] ${isActive ? 'text-amber-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  <span className="flex-1">{item.label}</span>
                  {isActive && (
                    <ChevronRight className="h-3.5 w-3.5 text-amber-500/50" />
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800/60 px-3 py-4 space-y-1">
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-500 transition-colors hover:bg-slate-800/50 hover:text-slate-300">
          <Settings className="h-[18px] w-[18px]" />
          Parametres
        </button>
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-500 transition-colors hover:bg-slate-800/50 hover:text-slate-300">
          <LogOut className="h-[18px] w-[18px]" />
          Deconnexion
        </button>
      </div>

      {/* User */}
      <div className="border-t border-slate-800/60 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/20 to-amber-500/20 font-display text-sm font-bold text-amber-400">
            AD
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium text-white">Amina Diallo</div>
            <div className="truncate text-xs text-slate-500">Baobab Agency</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
