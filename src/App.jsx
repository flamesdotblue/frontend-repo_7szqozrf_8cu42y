import { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Tabs from './components/Tabs';
import SectionCard from './components/SectionCard';
import WorkflowSimulator from './components/WorkflowSimulator';
import { Download, ExternalLink, CheckCircle2, XCircle, Target } from 'lucide-react';

function App() {
  const [role, setRole] = useState('Manager');
  const [activeTab, setActiveTab] = useState('Process Flow');
  const [notifications, setNotifications] = useState([]);
  const [expandAll, setExpandAll] = useState(true);
  const [expandKey, setExpandKey] = useState(0);

  const tabs = useMemo(
    () => [
      'Process Flow',
      'Performance Docs',
      'Evaluation',
      'SDLC Tickets',
    ],
    []
  );

  const pushNotification = (n) => setNotifications((prev) => [n, ...prev].slice(0, 8));
  const clearNotifications = () => setNotifications([]);

  const handleDownload = (name) => () => {
    pushNotification({ title: `${name} prepared`, time: new Date().toLocaleTimeString() });
    alert(`${name} export simulated. In a full build this would download a file.`);
  };

  const handleExpandToggle = () => {
    setExpandAll((v) => !v);
    setExpandKey((k) => k + 1); // force remount of cards to adopt defaultOpen
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Navbar role={role} setRole={setRole} notifications={notifications} clearNotifications={clearNotifications} />

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6">
        <div className="flex items-center justify-between">
          <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
          <div className="hidden items-center gap-2 sm:flex">
            <button
              onClick={handleExpandToggle}
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              {expandAll ? 'Collapse all' : 'Expand all'}
            </button>
            <button
              onClick={handleDownload('FRS Summary PDF')}
              className="inline-flex items-center gap-2 rounded-md border border-indigo-600 bg-indigo-600 px-3 py-2 text-sm text-white hover:bg-indigo-700"
            >
              <Download className="h-4 w-4" /> Export
            </button>
          </div>
        </div>

        {activeTab === 'Process Flow' && (
          <div className="space-y-4">
            <SectionCard
              key={`k-${expandKey}-flow-overview`}
              title="Interactive Process Simulator"
              subtitle="Click buttons to simulate the lifecycle"
              defaultOpen={true}
            >
              <WorkflowSimulator pushNotification={pushNotification} />
            </SectionCard>

            <SectionCard
              key={`k-${expandKey}-flow-user`}
              title="User Profile Creation"
              subtitle="System Administrator"
              defaultOpen={expandAll}
              actions={[
                { label: 'Create sample user', variant: 'primary', onClick: () => pushNotification({ title: 'Sample user created', time: new Date().toLocaleTimeString() }) },
              ]}
            >
              <p>
                The process validates user details, creates accounts, assigns default roles, and confirms via email before allowing sign-in.
              </p>
            </SectionCard>

            <SectionCard
              key={`k-${expandKey}-flow-goals`}
              title="Goal Setting & Approvals"
              subtitle="Manager and Employee collaboration"
              defaultOpen={expandAll}
              actions={[
                { label: 'Add example goal', onClick: () => pushNotification({ title: 'Example goal added', time: new Date().toLocaleTimeString() }) },
                { label: 'Submit for approval', icon: Target, onClick: () => pushNotification({ title: 'Goal submitted for approval', time: new Date().toLocaleTimeString() }) },
                { label: 'Approve', icon: CheckCircle2, onClick: () => pushNotification({ title: 'Goal approved', time: new Date().toLocaleTimeString() }) },
                { label: 'Reject', icon: XCircle, onClick: () => pushNotification({ title: 'Goal rejected', time: new Date().toLocaleTimeString() }) },
              ]}
            >
              <p>
                Supports manual and scheduled processes, deadline extensions, weight validations (preventing >100%), and notifications throughout the cycle.
              </p>
            </SectionCard>
          </div>
        )}

        {activeTab === 'Performance Docs' && (
          <div className="grid gap-4 lg:grid-cols-2">
            <SectionCard
              key={`k-${expandKey}-docs-eligibility`}
              title="Define Eligibility Profile"
              subtitle="Configure who participates"
              defaultOpen={expandAll}
              actions={[{ label: 'Open', icon: ExternalLink, onClick: () => pushNotification({ title: 'Eligibility profile opened', time: new Date().toLocaleTimeString() }) }]}
            >
              <p>Set criteria determining which workers are included in goal plans and reviews.</p>
            </SectionCard>

            <SectionCard
              key={`k-${expandKey}-docs-review`}
              title="Define Review Period"
              subtitle="Timeline setup"
              defaultOpen={expandAll}
              actions={[{ label: 'Add period', icon: Target, onClick: () => pushNotification({ title: 'Review period configured', time: new Date().toLocaleTimeString() }) }]}
            >
              <p>Establish start/end dates, cadence, and milestones for the performance year.</p>
            </SectionCard>

            <SectionCard
              key={`k-${expandKey}-docs-goalplans`}
              title="Define Goal Plans"
              subtitle="Templates and weights"
              defaultOpen={expandAll}
              actions={[{ label: 'Create plan', icon: Target, onClick: () => pushNotification({ title: 'Goal plan created', time: new Date().toLocaleTimeString() }) }]}
            >
              <p>Set goals, weights, and rules. Validate total weight does not exceed 100%.</p>
            </SectionCard>

            <SectionCard
              key={`k-${expandKey}-docs-schedule`}
              title="Schedule Goal Process"
              subtitle="Manual and scheduled runs"
              defaultOpen={expandAll}
              actions={[{ label: 'Schedule', icon: Target, onClick: () => pushNotification({ title: 'Goal process scheduled', time: new Date().toLocaleTimeString() }) }]}
            >
              <p>Run processes on demand or on schedule. Monitor and extend deadlines as needed.</p>
            </SectionCard>
          </div>
        )}

        {activeTab === 'Evaluation' && (
          <div className="grid gap-4 lg:grid-cols-2">
            <SectionCard
              key={`k-${expandKey}-eval-document`}
              title="Performance Document"
              subtitle="Create & publish"
              defaultOpen={expandAll}
              actions={[{ label: 'Publish', variant: 'primary', onClick: () => pushNotification({ title: 'Performance document published', time: new Date().toLocaleTimeString() }) }]}
            >
              <p>
                Create documents for eligible employees, then publish to notify them to begin appraisals. Include batch assignment, correct review period, and document name.
              </p>
            </SectionCard>

            <SectionCard
              key={`k-${expandKey}-eval-competencies`}
              title="Add Competencies"
              subtitle="By HR or Managers"
              defaultOpen={expandAll}
              actions={[{ label: 'Add competency', onClick: () => pushNotification({ title: 'Competency added to worker profile', time: new Date().toLocaleTimeString() }) }]}
            >
              <p>
                Add eligible competencies directly to an employee's talent profile. Repeat as required.
              </p>
            </SectionCard>
          </div>
        )}

        {activeTab === 'SDLC Tickets' && (
          <div className="space-y-4">
            <SectionCard
              key={`k-${expandKey}-tickets-overview`}
              title="Agile Delivery Overview"
              subtitle="5 stages, 5 tickets"
              defaultOpen={expandAll}
              actions={[{ label: 'Copy to clipboard', onClick: () => { navigator.clipboard.writeText('ADLC-163..167'); pushNotification({ title: 'Ticket keys copied', time: new Date().toLocaleTimeString() }); } }]}
            >
              <ul className="list-inside list-disc space-y-1">
                <li>Requirements & Analysis: ADLC-163</li>
                <li>Architecture & Design: ADLC-164</li>
                <li>Development: ADLC-165</li>
                <li>Integration & Testing: ADLC-166</li>
                <li>Deployment & Review: ADLC-167</li>
              </ul>
            </SectionCard>
          </div>
        )}

        <div className="flex items-center justify-between rounded-xl border bg-white px-4 py-3 text-sm text-slate-600">
          <span>Viewing as: <span className="font-medium text-slate-900">{role}</span></span>
          <div className="flex items-center gap-2">
            <button onClick={() => { setActiveTab('Process Flow'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="rounded-md border border-slate-200 bg-white px-3 py-1.5 hover:bg-slate-50">Open Simulator</button>
            <button onClick={() => { clearNotifications(); pushNotification({ title: 'Ready for next action', time: new Date().toLocaleTimeString() }); }} className="rounded-md border border-slate-200 bg-white px-3 py-1.5 hover:bg-slate-50">Clear Alerts</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
