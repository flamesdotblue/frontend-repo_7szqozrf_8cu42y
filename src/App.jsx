import { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Tabs from './components/Tabs';
import SectionCard from './components/SectionCard';
import WorkflowSimulator from './components/WorkflowSimulator';
import { Download, ExternalLink, CheckCircle2, XCircle, Target, BarChart3, Shield, Users } from 'lucide-react';

function App() {
  const [role, setRole] = useState('Manager');
  const [activeTab, setActiveTab] = useState('Introduction');
  const [notifications, setNotifications] = useState([]);
  const [expandAll, setExpandAll] = useState(true);
  const [expandKey, setExpandKey] = useState(0);

  const tabs = useMemo(
    () => [
      'Introduction',
      'System Overview',
      'Functional Requirements',
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

        {activeTab === 'Introduction' && (
          <div className="grid gap-4 lg:grid-cols-2">
            <SectionCard
              key={`k-${expandKey}-intro-purpose`}
              title="Purpose"
              subtitle="Why this system exists"
              defaultOpen={expandAll}
              actions={[{ label: 'View details', icon: ExternalLink, onClick: () => pushNotification({ title: 'Opened Purpose details', time: new Date().toLocaleTimeString() }) }]}
            >
              <p>
                The FRS outlines core features and functionality to streamline performance management: tracking employee performance, enabling collaboration, and supporting data-driven decisions across design, development, and implementation.
              </p>
            </SectionCard>

            <SectionCard
              key={`k-${expandKey}-intro-scope`}
              title="Scope"
              subtitle="What this covers"
              defaultOpen={expandAll}
              actions={[{ label: 'Read more', icon: ExternalLink, onClick: () => pushNotification({ title: 'Viewed Scope', time: new Date().toLocaleTimeString() }) }]}
            >
              <p>
                Focuses on HR processes in the PMS, summarizing goals, expected outcomes, and the boundaries required to derive functional specifications.
              </p>
            </SectionCard>

            <SectionCard
              key={`k-${expandKey}-intro-users`}
              title="Target Users"
              subtitle="Primary roles supported"
              defaultOpen={expandAll}
              actions={[{ label: 'Switch to my role', onClick: () => pushNotification({ title: `Switched context to ${role}`, time: new Date().toLocaleTimeString() }) }]}
            >
              <ul className="list-inside list-disc space-y-1">
                <li>System Administrator</li>
                <li>Performance Management Administrator</li>
                <li>Managers</li>
                <li>Employees</li>
                <li>HR Personnel</li>
              </ul>
            </SectionCard>

            <SectionCard
              key={`k-${expandKey}-intro-objectives`}
              title="Objectives"
              subtitle="What success looks like"
              defaultOpen={expandAll}
              actions={[{ label: 'Mark as understood', icon: CheckCircle2, variant: 'primary', onClick: () => pushNotification({ title: 'Objectives acknowledged', time: new Date().toLocaleTimeString() }) }]}
            >
              <ul className="list-inside list-disc space-y-1">
                <li>Streamline processes for efficiency and effectiveness.</li>
                <li>Improve collaboration between managers and employees.</li>
                <li>Provide reporting and analytics for data-driven evaluations.</li>
              </ul>
            </SectionCard>
          </div>
        )}

        {activeTab === 'System Overview' && (
          <div className="grid gap-4 lg:grid-cols-2">
            <SectionCard
              key={`k-${expandKey}-overview-architecture`}
              title="Architecture Overview"
              subtitle="Modular, scalable components"
              defaultOpen={expandAll}
              actions={[{ label: 'Open diagram', icon: ExternalLink, onClick: () => pushNotification({ title: 'Architecture diagram opened', time: new Date().toLocaleTimeString() }) }]}
            >
              <p>
                Components include user management, goal setting, tracking, feedback, and reporting. Data flows from input through tracking to analytics, with integration points for existing HR systems.
              </p>
            </SectionCard>

            <SectionCard
              key={`k-${expandKey}-overview-principles`}
              title="Key Principles"
              subtitle="Security, UX, and integration"
              defaultOpen={expandAll}
              actions={[{ label: 'Security posture', icon: Shield, onClick: () => pushNotification({ title: 'Reviewed security posture', time: new Date().toLocaleTimeString() }) }]}
            >
              <ul className="list-inside list-disc space-y-1">
                <li>Role-based access control and authentication.</li>
                <li>Responsive, user-friendly interfaces.</li>
                <li>RESTful API design and documentation.</li>
              </ul>
            </SectionCard>

            <SectionCard
              key={`k-${expandKey}-overview-kpis`}
              title="KPIs & Analytics"
              subtitle="Track performance outcomes"
              defaultOpen={expandAll}
              actions={[{ label: 'View dashboard', icon: BarChart3, onClick: () => pushNotification({ title: 'Analytics dashboard opened', time: new Date().toLocaleTimeString() }) }]}
            >
              <p>
                Customizable dashboards, reports, and exports enable monitoring and data-driven decisions.
              </p>
            </SectionCard>

            <SectionCard
              key={`k-${expandKey}-overview-users`}
              title="People & Roles"
              subtitle="Who does what"
              defaultOpen={expandAll}
              actions={[{ label: 'Manage roles', icon: Users, onClick: () => pushNotification({ title: 'Role management viewed', time: new Date().toLocaleTimeString() }) }]}
            >
              <p>
                Administrators manage accounts and permissions. Managers set goals and reviews. Employees contribute goals and self-evaluations. HR oversees compliance and process.
              </p>
            </SectionCard>
          </div>
        )}

        {activeTab === 'Functional Requirements' && (
          <div className="grid gap-4 lg:grid-cols-2">
            <SectionCard
              key={`k-${expandKey}-frs-highlevel`}
              title="High-Level Requirements"
              subtitle="Core capabilities"
              defaultOpen={expandAll}
              actions={[{ label: 'Download list', icon: Download, onClick: handleDownload('High-Level Requirements') }]}
            >
              <ul className="list-inside list-disc space-y-1">
                <li>User Management (roles, permissions, auth)</li>
                <li>Goal Setting and Tracking</li>
                <li>Feedback and Evaluations</li>
                <li>Reporting & Analytics</li>
                <li>Integrations and Security Compliance</li>
                <li>UX, Customization, and Scalability</li>
              </ul>
            </SectionCard>

            <SectionCard
              key={`k-${expandKey}-frs-roles`}
              title="Roles & Responsibilities"
              subtitle="What each role can do"
              defaultOpen={expandAll}
            >
              <ul className="list-inside list-disc space-y-1">
                <li>System Admin: manage users and permissions.</li>
                <li>Managers: set goals, review, and provide feedback.</li>
                <li>Employees: access goals, submit self-evals.</li>
                <li>HR: oversee process and compliance.</li>
              </ul>
            </SectionCard>
          </div>
        )}

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
