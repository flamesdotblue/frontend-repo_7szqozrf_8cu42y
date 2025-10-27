export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="mx-auto grid max-w-7xl grid-flow-col auto-cols-max gap-2 px-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors ${
              active === tab
                ? 'border-indigo-600 bg-indigo-600 text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
