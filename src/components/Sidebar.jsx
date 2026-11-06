import React from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Compass, 
  FileText, 
  MapPin, 
  BarChart3, 
  ShieldAlert, 
  Wrench,
  Settings,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function Sidebar({ currentView, setCurrentView, reportCount, pendingCount }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'report', label: 'Report an Issue', icon: PlusCircle, highlight: true },
    { id: 'explore', label: 'Explore Reports', icon: Compass, badge: reportCount },
    { id: 'my-reports', label: 'My Reports', icon: FileText },
    { id: 'campus-map', label: 'Campus Map', icon: MapPin },
    { id: 'insights', label: 'Insights', icon: BarChart3 },
    { id: 'admin', label: 'Admin Dashboard', icon: ShieldAlert, badge: pendingCount ? `${pendingCount} pend` : null, badgeColor: 'bg-amber-100 text-amber-800' }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 h-screen sticky top-0 border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 ring-2 ring-indigo-400/20">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white text-lg tracking-tight font-['Plus_Jakarta_Sans']">SilentSignal</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Campus Infrastructure</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-5 px-3 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
          Workspace
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          if (item.highlight) {
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 mb-3 shadow-sm ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-indigo-600/30 shadow-md ring-2 ring-indigo-400/40'
                    : 'bg-indigo-600/15 text-indigo-300 hover:bg-indigo-600/25 border border-indigo-500/30'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-indigo-300" />
                  <span className="font-semibold text-white tracking-wide">{item.label}</span>
                </div>
                <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 group ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-semibold'
                  : 'hover:bg-slate-800/80 text-slate-400 hover:text-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${item.badgeColor || (isActive ? 'bg-indigo-800 text-indigo-100' : 'bg-slate-800 text-slate-400')}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* University Campus Tag */}
      <div className="mx-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 mb-3 text-xs">
        <div className="flex items-center justify-between mb-1">
          <span className="text-slate-400 font-medium">Campus Node</span>
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        </div>
        <p className="font-semibold text-slate-200 truncate">Central Tech Campus</p>
        <p className="text-[11px] text-slate-500 mt-0.5">Automated Dispatch Active</p>
      </div>

      {/* Bottom Profile section */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/60">
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-800/70 transition-colors cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-xs ring-2 ring-slate-700">
                DM
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-white group-hover:text-indigo-300 transition-colors">Dev Mehta</p>
              <p className="text-[11px] text-slate-400">Student • Roll #21BCS</p>
            </div>
          </div>
          <button 
            onClick={() => setCurrentView('my-reports')}
            title="Account Settings & Reports"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700/60"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

