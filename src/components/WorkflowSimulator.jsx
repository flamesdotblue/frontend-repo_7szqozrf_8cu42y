import { useState } from 'react';
import { Play, Check, X, Plus, Calendar, ClipboardList } from 'lucide-react';

export default function WorkflowSimulator({ pushNotification }) {
  const [steps, setSteps] = useState([]);

  const addStep = (type, label) => {
    const time = new Date().toLocaleTimeString();
    const entry = { type, label, time };
    setSteps((s) => [entry, ...s]);
    pushNotification?.({ title: label, time });
  };

  const actions = [
    { label: 'Create User', icon: Plus, onClick: () => addStep('create', 'User account created') },
    { label: 'Login', icon: Play, onClick: () => addStep('login', 'User logged in') },
    { label: 'Add Goal', icon: Plus, onClick: () => addStep('goal', 'Goal added to plan') },
    { label: 'Submit for Approval', icon: ClipboardList, onClick: () => addStep('submit', 'Goals submitted for approval') },
    { label: 'Approve', icon: Check, onClick: () => addStep('approve', 'Manager approved goals') },
    { label: 'Reject', icon: X, onClick: () => addStep('reject', 'Manager rejected goals') },
    { label: 'Schedule Goal Process', icon: Calendar, onClick: () => addStep('schedule', 'Goal process scheduled') },
  ];

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {actions.map((a) => (
          <button
            key={a.label}
            onClick={a.onClick}
            className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            <a.icon className="h-4 w-4" />
            {a.label}
          </button>
        ))}
      </div>
      <div className="max-h-56 overflow-auto rounded-lg border">
        <ul className="divide-y">
          {steps.length === 0 ? (
            <li className="p-3 text-sm text-slate-500">Use the buttons above to simulate the process flow.</li>
          ) : (
            steps.map((s, i) => (
              <li key={i} className="p-3 text-sm">
                <span className="font-medium text-slate-800">{s.label}</span>
                <span className="ml-2 text-xs text-slate-500">{s.time}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
