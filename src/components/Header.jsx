import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  Menu, 
  X,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function Header({ 
  onSearch, 
  searchQuery, 
  notifications, 
  onMarkNotificationRead, 
  onNotificationClick,
  onOpenMobileMenu,
  onQuickReport
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 py-3.5 flex items-center justify-between gap-4">
      {/* Mobile Menu Button + Title Area */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-tight">
            Campus Maintenance Dashboard
          </h1>
          <p className="text-xs text-slate-500 font-medium hidden sm:block">
            Report issues. Track progress. Improve your campus.
          </p>
        </div>
      </div>

      {/* Search & Actions */}
      <div className="flex items-center gap-3">
        {/* Global Search Bar */}
        <div className="relative w-44 md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search issues, buildings, rooms..."
            className="w-full bg-slate-100/90 hover:bg-slate-100 focus:bg-white text-xs text-slate-800 placeholder-slate-400 pl-9 pr-3 py-2 rounded-xl border border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-150"
          />
          {searchQuery && (
            <button 
              onClick={() => onSearch('')} 
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Quick Report CTA */}
        <button
          onClick={onQuickReport}
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Report Issue</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold bg-indigo-100 text-indigo-700 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <button
                  onClick={() => notifications.forEach(n => onMarkNotificationRead(n.id))}
                  className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Mark all read
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 mt-1">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">
                    No notifications yet
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        onMarkNotificationRead(notif.id);
                        if (onNotificationClick) onNotificationClick(notif);
                      }}
                      className={`p-3 rounded-xl transition-colors cursor-pointer flex gap-3 text-left ${
                        notif.read ? 'hover:bg-slate-50' : 'bg-indigo-50/40 hover:bg-indigo-50/70'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {notif.type === 'resolved' ? (
                          <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        ) : notif.type === 'status' ? (
                          <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                            <Clock className="w-4 h-4" />
                          </div>
                        ) : (
                          <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                            <Sparkles className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="text-xs font-semibold text-slate-900 truncate">{notif.title}</p>
                          <span className="text-[10px] text-slate-400 shrink-0">{notif.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">
                          {notif.message}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-indigo-100">
            DM
          </div>
        </div>
      </div>
    </header>
  );
}

