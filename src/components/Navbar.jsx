import { useState } from 'react';
import { User, Bell, Settings } from 'lucide-react';

export default function Navbar({ role, setRole, notifications, clearNotifications }) {
  const [open, setOpen] = useState(false);
  const roles = [
    'System Administrator',
    'Performance Management Administrator',
    'Manager',
    'Employee',
    'HR Personnel',
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-indigo-600" />
          <div className="text-sm leading-tight">
            <p className="font-semibold text-slate-900">Performance Management System</p>
            <p className="text-xs text-slate-500">Functional Requirement Explorer</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              aria-label="Notifications"
              onClick={() => setOpen((v) => !v)}
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border bg-white text-slate-700 hover:bg-slate-50"
            >
              <Bell className="h-4 w-4" />
              {notifications.length > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-[1rem] translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-medium text-white">
                  {notifications.length}
                </span>
              )}
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-64 overflow-hidden rounded-lg border bg-white shadow-lg">
                <div className="flex items-center justify-between border-b px-3 py-2">
                  <p className="text-sm font-medium">Notifications</p>
                  <button onClick={clearNotifications} className="text-xs text-indigo-600 hover:underline">Clear</button>
                </div>
                <ul className="max-h-64 divide-y overflow-auto">
                  {notifications.length === 0 ? (
                    <li className="p-3 text-sm text-slate-500">You're all caught up!</li>
                  ) : (
                    notifications.map((n, i) => (
                      <li key={i} className="p-3 text-sm">
                        <p className="font-medium text-slate-800">{n.title}</p>
                        <p className="text-xs text-slate-500">{n.time}</p>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </div>

          <div className="relative">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="h-9 rounded-md border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <button className="inline-flex h-9 items-center gap-2 rounded-md border bg-white px-3 text-sm text-slate-700 hover:bg-slate-50">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </button>

          <button className="inline-flex h-9 items-center gap-2 rounded-md border bg-white px-3 text-sm text-slate-700 hover:bg-slate-50">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </button>
        </div>
      </div>
    </header>
  );
}
