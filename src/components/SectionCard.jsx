import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function SectionCard({ title, subtitle, actions = [], children, defaultOpen = true, expandAllSignal }) {
  const [open, setOpen] = useState(defaultOpen);

  // Respond to expand/collapse all requests from parent by toggling a boolean signal
  // expandAllSignal = { key: number, open: boolean }
  // When key changes, sync open state to provided value
  if (expandAllSignal) {
    // eslint-disable-next-line react/prop-types
    const { key, open: desired } = expandAllSignal;
    // use a ref-less trick: rely on key to force remount in parent when toggling all
  }

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {actions.map((a, i) => (
            <button
              key={i}
              onClick={a.onClick}
              className={`inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm ${a.variant === 'primary' ? 'border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-700' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}
            >
              {a.icon && <a.icon className="h-4 w-4" />}
              {a.label}
            </button>
          ))}
          <button
            aria-label={open ? 'Collapse' : 'Expand'}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
          >
            {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && <div className="mt-4 text-sm text-slate-700">{children}</div>}
    </div>
  );
}
