import { useState } from "react";
import type { ReactNode } from "react";

import {

  Activity,

  Bell,

  CalendarDays,

  ChevronDown,

  ChevronLeft,

  ChevronRight,

  Headphones,

  LayoutDashboard,

  Menu,

  MessageSquare,

  Phone,

  Search,

  Settings,

  Users,

  X,

} from "lucide-react";

import "./App.css";

type Page =

  | "Dashboard"

  | "Plan"

  | "Calendar"

  | "Pulse";

const navigation = [

  { label: "Dashboard", icon: LayoutDashboard },

  { label: "Plan", icon: Phone },

  { label: "Calendar", icon: CalendarDays },

  { label: "Pulse", icon: Activity },

] as const;

function App() {

  const [page, setPage] = useState<Page>("Dashboard");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [showNotifications, setShowNotifications] = useState(false);

  const [showProfile, setShowProfile] = useState(false);

  const [showLeads, setShowLeads] = useState(false);

  return (

    <div className="app-shell">

      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>

        <div className="brand">

          <div className="brand-mark">

            <Headphones size={23} />

          </div>

          <div>

            <div className="brand-name">on-ground<span>.ai</span></div>

            <div className="brand-caption">CALL CENTRE</div>

          </div>

          <button

            className="icon-button mobile-close"

            onClick={() => setSidebarOpen(false)}

            aria-label="Close navigation"

          >

            <X size={19} />

          </button>

        </div>

        <div className="workspace-label">WORKSPACE</div>

        <nav className="navigation">

          {navigation.map(({ label, icon: Icon }) => (

            <button

              key={label}

              className={`nav-item ${page === label ? "active" : ""}`}

              onClick={() => {

                setPage(label);

                setSidebarOpen(false);

              }}

            >

              <Icon size={19} />

              <span>{label}</span>

              {label === "Pulse" && <span className="nav-dot" />}

            </button>

          ))}

        </nav>

        <div className="sidebar-bottom">

          <div className="help-card">

            <div className="help-icon">

              <MessageSquare size={19} />

            </div>

            <strong>Need a hand?</strong>

            <p>We're here to help you get the most out of your workspace.</p>

            <button onClick={() => setPage("Pulse")}>Get support <ChevronRight size={15} /></button>

          </div>

          <button className="nav-item settings-item">

            <Settings size={19} />

            <span>Settings</span>

          </button>

          <div className="user-profile">

            <div className="avatar">PR</div>

            <div className="user-details">

              <strong>Praneet R.</strong>

              <span>Sales representative</span>

            </div>

            <ChevronDown size={16} />

          </div>

        </div>

      </aside>

      {sidebarOpen && (

        <button

          className="sidebar-overlay"

          aria-label="Close navigation overlay"

          onClick={() => setSidebarOpen(false)}

        />

      )}

      <main className="main-area">

        <header className="topbar">

          <button

            className="icon-button mobile-menu"

            onClick={() => setSidebarOpen(true)}

            aria-label="Open navigation"

          >

            <Menu size={21} />

          </button>

          <div className="breadcrumb">

            <span>Workspace</span>

            <ChevronRight size={15} />

            <strong>{page}</strong>

          </div>

          <div className="topbar-actions">

            <label className="search-box">

              <Search size={17} />

              <input

                value={search}

                onChange={(event) => setSearch(event.target.value)}

                placeholder="Search anything..."

              />

              <kbd>⌘ K</kbd>

            </label>

            <div className="action-wrapper">

              <button

                className="icon-button notification-button"

                aria-label="Notifications"

                onClick={() => setShowNotifications(!showNotifications)}

              >

                <Bell size={19} />

                <span className="notification-dot" />

              </button>

              {showNotifications && (

                <div className="popover-panel">

                  <strong>Notifications</strong>

                  <p className="muted">You're all caught up.</p>

                </div>

              )}

            </div>

            <div className="action-wrapper">

              <button

                className="topbar-avatar"

                onClick={() => setShowProfile(!showProfile)}

                aria-label="Open profile"

              >

                PR

              </button>

              {showProfile && (

                <div className="popover-panel profile-popover">

                  <strong>Praneet R.</strong>

                  <p className="muted">Sales representative</p>

                  <button onClick={() => setShowProfile(false)}>Close</button>

                </div>

              )}

            </div>

          </div>

        </header>

        <div className="page-content">

          {page === "Dashboard" && (

            <Dashboard

              onOpenLeads={() => setShowLeads(true)}

              search={search}

            />

          )}

          {page === "Plan" && <PlanPage search={search} />}

          {page === "Calendar" && <CalendarPage />}

          {page === "Pulse" && <PulsePage />}

        </div>

      </main>

      {showLeads && (

        <LeadsModal onClose={() => setShowLeads(false)} />

      )}

    </div>

  );

}

function Dashboard({

  onOpenLeads,

  search,

}: {

  onOpenLeads: () => void;

  search: string;

}) {
const tasks = [

    { time: "09:30 AM", name: "Mukunda R.", company: "Acme Technologies", type: "Follow-up call", color: "blue" },

    { time: "11:00 AM", name: "Sarah Mitchell", company: "Bright Solutions", type: "Discovery call", color: "purple" },

    { time: "02:30 PM", name: "Rahul Sharma", company: "NexGen Systems", type: "Product demo", color: "green" },

  ].filter((task) =>

    `${task.name} ${task.company} ${task.type}`

      .toLowerCase()

      .includes(search.toLowerCase())

  );

  return (

    <>

      <div className="welcome-row">

        <div>

          <div className="eyebrow">FRIDAY, OCTOBER 9, 2026</div>

          <h1>Good morning, Praneet <span>✦</span></h1>

          <p className="subtitle">Here's what's happening with your calls today.</p>

        </div>

        <button className="primary-button" onClick={onOpenLeads}>

          <Users size={17} /> View leads

        </button>

      </div>

      <section className="metric-grid">

        <MetricCard label="Calls today" value="24" detail="+12% vs yesterday" tone="green" icon={<Phone size={19} />} />

        <MetricCard label="Connected" value="18" detail="75% connection rate" tone="blue" icon={<Activity size={19} />} />

        <MetricCard label="Follow-ups due" value="7" detail="3 need your attention" tone="orange" icon={<CalendarDays size={19} />} />

        <MetricCard label="Pipeline value" value="₹8.4L" detail="+8.2% this week" tone="purple" icon={<Users size={19} />} />

      </section>

      <section className="dashboard-grid">

        <div className="panel tasks-panel">

          <div className="panel-heading">

            <div>

              <h2>Today's plan</h2>

              <p>Your upcoming calls and follow-ups</p>

            </div>

            <button className="text-button" onClick={onOpenLeads}>View all <ChevronRight size={15} /></button>

          </div>

          <div className="task-list">

            {tasks.map((task) => (

              <button className="task-row" key={task.name} onClick={onOpenLeads}>

                <div className="task-time">{task.time}</div>

                <div className={`task-marker ${task.color}`} />

                <div className="task-info">

                  <strong>{task.name}</strong>

                  <span>{task.company}</span>

                </div>

                <span className="task-type">{task.type}</span>

                <ChevronRight className="task-arrow" size={17} />

              </button>

            ))}

            {tasks.length === 0 && (

              <p className="empty-state">No matching calls found.</p>

            )}

          </div>

          <button className="secondary-button full-button" onClick={onOpenLeads}>

            <Users size={16} /> Open lead details

          </button>

        </div>

        <div className="panel activity-panel">

          <div className="panel-heading">

            <div>

              <h2>Activity overview</h2>

              <p>Your progress at a glance</p>

            </div>

            <span className="period-label">This week <ChevronDown size={14} /></span>

          </div>

          <div className="activity-score">

            <div>

              <span className="muted">Total calls</span>

              <div className="score-number">126</div>

            </div>

            <span className="trend-pill">↑ 14.5%</span>

          </div>

          <div className="bar-chart" aria-label="Weekly call activity chart">

            {[45, 68, 52, 86, 63, 95, 38].map((height, index) => (

              <div className="bar-column" key={index}>

                <div className="bar-track">

                  <div className={`bar-fill ${index === 5 ? "bar-highlight" : ""}`} style={{ height: `${height}%` }} />

                </div>

                <span>{["M", "T", "W", "T", "F", "S", "S"][index]}</span>

              </div>

            ))}

          </div>

          <div className="chart-legend">

            <span><i className="legend-dot" /> Calls made</span>

            <span><i className="legend-dot legend-muted" /> Daily average</span>

          </div>

        </div>

      </section>

      <section className="panel leads-panel">

        <div className="panel-heading">

          <div>

            <h2>Priority leads</h2>

            <p>People worth reaching out to next</p>

          </div>

          <button className="text-button" onClick={onOpenLeads}>All leads <ChevronRight size={15} /></button>

        </div>

        <div className="lead-table">

          <div className="lead-table-head">

            <span>CONTACT</span>

            <span>COMPANY</span>

            <span>STATUS</span>

            <span>LAST CONTACT</span>

            <span />

          </div>

          <button className="lead-table-row" onClick={onOpenLeads}>

            <span className="contact-cell">

              <span className="mini-avatar">MR</span>

              <span><strong>Mukunda R.</strong><small>mukunda@example.com</small></span>

            </span>

            <span>Acme Technologies</span>

            <span><span className="status-pill status-warm">Follow-up due</span></span>

            <span>Yesterday</span>

            <ChevronRight size={17} />

          </button>

          <button className="lead-table-row" onClick={onOpenLeads}>

            <span className="contact-cell">

              <span className="mini-avatar avatar-purple">SM</span>

              <span><strong>Sarah Mitchell</strong><small>sarah@example.com</small></span>

            </span>

            <span>Bright Solutions</span>

            <span><span className="status-pill status-good">Qualified</span></span>

            <span>Oct 7, 2026</span>

            <ChevronRight size={17} />

          </button>

          <button className="lead-table-row" onClick={onOpenLeads}>

            <span className="contact-cell">

              <span className="mini-avatar avatar-green">RS</span>

              <span><strong>Rahul Sharma</strong><small>rahul@example.com</small></span>

            </span>

            <span>NexGen Systems</span>

            <span><span className="status-pill status-blue">Demo scheduled</span></span>

            <span>Oct 6, 2026</span>

            <ChevronRight size={17} />

          </button>

        </div>

      </section>

    </>

  );

}

function MetricCard({

  label,

  value,

  detail,

  tone,

  icon,

}: {

  label: string;

  value: string;

  detail: string;

  tone: string;

  icon: ReactNode;

}) {

  return (

    <div className="metric-card">

      <div className="metric-top">

        <span>{label}</span>

        <span className={`metric-icon ${tone}`}>{icon}</span>

      </div>

      <div className="metric-value">{value}</div>

      <div className="metric-detail">{detail}</div>

    </div>

  );

}

function LeadsModal({ onClose }: { onClose: () => void }) {
  const [leadIndex, setLeadIndex] = useState(0);
  const [signalsOpen, setSignalsOpen] = useState(true);
  const [callStatus, setCallStatus] = useState<
    "idle" | "calling" | "completed"
  >("idle");

  const leads = [
    {
      name: "Mukunda R.",
      initials: "MR",
      company: "Acme Technologies",
      title: "Head of Operations",
      email: "mukunda@example.com",
      phone: "+91 98765 43210",
      score: 92,
      intent: "High intent",
      status: "Follow-up due",
      summary:
        "Mukunda is evaluating solutions to improve his team's call operations. He has reviewed the product overview and requested a follow-up discussion.",
      signals: [
        "Visited pricing page twice this week",
        "Downloaded the product overview",
        "Requested a follow-up call",
      ],
    },
    {
      name: "Sarah Mitchell",
      initials: "SM",
      company: "Bright Solutions",
      title: "Operations Director",
      email: "sarah@example.com",
      phone: "+91 98765 12345",
      score: 84,
      intent: "Medium intent",
      status: "Qualified",
      summary:
        "Sarah is exploring ways to streamline her team's workflow and is interested in a product demonstration.",
      signals: [
        "Viewed product features",
        "Engaged with follow-up email",
        "Asked about team onboarding",
      ],
    },
  ];

  const lead = leads[leadIndex];

  function changeLead(direction: number) {
    setLeadIndex((current) => (current + direction + leads.length) % leads.length);
    setCallStatus("idle");
    setSignalsOpen(true);
  }

  function handleCall() {
    if (callStatus === "idle" || callStatus === "completed") {
      setCallStatus("calling");
    } else {
      setCallStatus("completed");
    }
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="lead-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-title"
      >
        <div className="modal-header">
          <div>
            <div className="eyebrow">
              LEAD DETAILS · {leadIndex + 1} OF {leads.length}
            </div>
            <h2 id="lead-title">Lead profile</h2>
          </div>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close lead details"
          >
            <X size={20} />
          </button>
        </div>

        <div className="lead-profile-banner">
          <div className="large-avatar">{lead.initials}</div>
          <div className="lead-identity">
            <h3>{lead.name}</h3>
            <p>{lead.title} · {lead.company}</p>
            <span className="status-pill status-warm">{lead.status}</span>
          </div>
          <div className="lead-score">
            <span>ICP SCORE</span>
            <strong>{lead.score}<small>/100</small></strong>
          </div>
        </div>

        <div className="lead-contact-grid">
          <div><span>Email</span><strong>{lead.email}</strong></div>
          <div><span>Phone</span><strong>{lead.phone}</strong></div>
          <div><span>Intent</span><strong className="intent-high">{lead.intent}</strong></div>
          <div><span>Company</span><strong>{lead.company}</strong></div>
        </div>

        <div className="modal-section">
          <h3>About this lead</h3>
          <p>{lead.summary}</p>
        </div>

        <div className="signals-section">
          <button
            className="signals-toggle"
            onClick={() => setSignalsOpen((open) => !open)}
            aria-expanded={signalsOpen}
          >
            <span>
              <Activity size={17} /> Buying signals
              <span className="signal-count">{lead.signals.length}</span>
            </span>
            <ChevronDown
              className={signalsOpen ? "" : "rotate-chevron"}
              size={18}
            />
          </button>
          {signalsOpen && (
            <div className="signals-list">
              {lead.signals.map((signal) => (
                <div className="signal-row" key={signal}>
                  <span className="signal-check">✓</span>{signal}
                </div>
              ))}
            </div>
          )}
        </div>

        {callStatus !== "idle" && (
          <div
            className={`call-status-message ${callStatus === "completed" ? "call-completed" : ""}`}
            role="status"
          >
            {callStatus === "calling"
              ? `Simulated call in progress with ${lead.name}.`
              : `Call with ${lead.name} marked as completed.`}
          </div>
        )}

        <div className="modal-footer">
          <button className="secondary-button" onClick={() => changeLead(-1)}>
            <ChevronLeft size={16} /> Previous
          </button>
          <button className="secondary-button" onClick={() => changeLead(1)}>
            Next <ChevronRight size={16} />
          </button>
          <button className="primary-button" onClick={handleCall}>
            <Phone size={16} />
            {callStatus === "idle"
              ? "Start call"
              : callStatus === "calling"
                ? "Complete call"
                : "Call again"}
          </button>
        </div>
      </section>
    </div>
  );
}


function PlanPage({ search }: { search: string }) {
  const [tab, setTab] = useState<
    "Calls to make" | "Incoming" | "Recent"
  >("Calls to make");

  const [called, setCalled] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [callMessages, setCallMessages] = useState<Record<string, string>>(
    {}
  );

  const lists = {
    "Calls to make": [
      {
        name: "Mukunda R.",
        company: "Acme Technologies",
        phone: "+91 98765 43210",
        reason: "Follow-up · High intent",
        score: 92,
      },
      {
        name: "Sarah Mitchell",
        company: "Bright Solutions",
        phone: "+91 98765 12345",
        reason: "Discovery call",
        score: 84,
      },
      {
        name: "Rahul Sharma",
        company: "NexGen Systems",
        phone: "+91 98765 56789",
        reason: "Product demo",
        score: 78,
      },
    ],
    Incoming: [
      {
        name: "Amit Kumar",
        company: "Northstar Labs",
        phone: "+91 98765 55555",
        reason: "Missed call · Callback requested",
        score: 88,
      },
      {
        name: "Mukunda R.",
        company: "Acme Technologies",
        phone: "+91 98765 43210",
        reason: "Returning lead",
        score: 92,
      },
    ],
    Recent: [
      {
        name: "Sarah Mitchell",
        company: "Bright Solutions",
        phone: "+91 98765 12345",
        reason: "Connected · 8 minutes",
        score: 84,
      },
      {
        name: "Rahul Sharma",
        company: "NexGen Systems",
        phone: "+91 98765 56789",
        reason: "No answer · 2 minutes",
        score: 78,
      },
    ],
  };

  const visible = lists[tab].filter((item) =>
    `${item.name} ${item.company} ${item.reason}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function handleCall(name: string) {
    setCalled((previous) =>
      previous.includes(name) ? previous : [...previous, name]
    );

    setCallMessages((previous) => ({
      ...previous,
      [name]:
        tab === "Incoming"
          ? `Callback logged for ${name}. This is a simulated action.`
          : tab === "Recent"
            ? `Call with ${name} added to your review list.`
            : `Practice call with ${name} marked as started.`,
    }));
  }

  return (
    <>
      <div className="page-title-row">
        <div>
          <div className="eyebrow">YOUR WORK QUEUE</div>
          <h1>Call plan</h1>
          <p className="subtitle">
            Know who to call, who called you, and what happened recently.
          </p>
        </div>
      </div>

      <div className="panel plan-panel">
        <div className="tab-list">
          {(["Calls to make", "Incoming", "Recent"] as const).map(
            (item) => (
              <button
                key={item}
                className={`tab-button ${
                  tab === item ? "selected" : ""
                }`}
                onClick={() => {
                  setTab(item);
                  setExpanded(null);
                }}
              >
                {item}
                <span>{lists[item].length}</span>
              </button>
            )
          )}
        </div>

        <div className="plan-list">
          {visible.map((item) => {
            const isExpanded = expanded === item.name;
            const isCalled = called.includes(item.name);

            return (
              <div
                className="plan-item"
                key={`${tab}-${item.name}`}
              >
                <button
                  className="plan-item-main"
                  onClick={() =>
                    setExpanded(isExpanded ? null : item.name)
                  }
                  aria-expanded={isExpanded}
                >
                  <div className="mini-avatar">
                    {item.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div className="plan-person">
                    <strong>{item.name}</strong>
                    <span>{item.company}</span>
                    <small>{item.reason}</small>
                  </div>

                  <span className="score-badge">
                    ICP {item.score}
                  </span>

                  <ChevronDown
                    className={isExpanded ? "rotate-chevron" : ""}
                    size={18}
                  />
                </button>

                {isExpanded && (
                  <div className="plan-expanded">
                    <span>
                      <strong>Phone:</strong> {item.phone}
                    </span>
                    <span>
                      <strong>Company:</strong> {item.company}
                    </span>
                    <span>
                      <strong>Reason:</strong> {item.reason}
                    </span>
                    <span>
                      <strong>Suggested next step:</strong>{" "}
                      {tab === "Incoming"
                        ? "Return this call and confirm their requirements."
                        : tab === "Recent"
                          ? "Review the previous call outcome and record follow-up."
                          : "Discuss the lead's current requirements."}
                    </span>
                  </div>
                )}

                <div className="plan-item-actions">
                  <button
                    className="secondary-button"
                    onClick={() =>
                      setExpanded(isExpanded ? null : item.name)
                    }
                  >
                    {isExpanded ? "Hide details" : "Details"}
                  </button>

                  <button
                    className="primary-button"
                    onClick={() => handleCall(item.name)}
                  >
                    <Phone size={15} />
                    {isCalled
                      ? "Action logged"
                      : tab === "Incoming"
                        ? "Call back"
                        : tab === "Recent"
                          ? "Review call"
                          : "Practise call"}
                  </button>
                </div>

                {callMessages[item.name] && (
                  <div className="plan-action-message" role="status">
                    {callMessages[item.name]}
                  </div>
                )}
              </div>
            );
          })}

          {visible.length === 0 && (
            <p className="empty-state">
              No matching contacts in this tab.
            </p>
          )}
        </div>
      </div>
    </>
  );
}


function CalendarPage() {
  const [today] = useState(() => new Date());
  const [month, setMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const days = new Date(year, monthIndex + 1, 0).getDate();
  const offset = new Date(year, monthIndex, 1).getDay();

  const events: Record<string, string[]> = {
    "2026-9-9": [
      "09:30 AM · Mukunda R. — Follow-up",
      "11:00 AM · Sarah Mitchell — Discovery call",
      "02:30 PM · Rahul Sharma — Product demo",
    ],
    "2026-9-12": ["10:00 AM · Team pipeline review"],
    "2026-9-15": ["01:00 PM · Product demonstration"],
    "2026-9-20": ["11:30 AM · Customer follow-up"],
  };

  function dateKey(date: Date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  function goToToday() {
    const now = new Date();
    setMonth(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedDate(now);
  }

  const selectedEvents = events[dateKey(selectedDate)];

  return (
    <>
      <div className="page-title-row">
        <div>
          <div className="eyebrow">SCHEDULE & FOLLOW-UPS</div>
          <h1>Calendar</h1>
          <p className="subtitle">
            Keep your calls and follow-ups organised.
          </p>
        </div>

        <button className="secondary-button" onClick={goToToday}>
          Today
        </button>
      </div>

      <div className="calendar-layout">
        <section className="panel calendar-panel">
          <div className="calendar-heading">
            <h2>
              {month.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h2>

            <div className="calendar-nav">
              <button
                className="icon-button"
                aria-label="Previous month"
                onClick={() =>
                  setMonth(new Date(year, monthIndex - 1, 1))
                }
              >
                <ChevronLeft size={18} />
              </button>

              <button
                className="icon-button"
                aria-label="Next month"
                onClick={() =>
                  setMonth(new Date(year, monthIndex + 1, 1))
                }
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="calendar-grid">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day) => (
                <div className="calendar-weekday" key={day}>
                  {day}
                </div>
              )
            )}

            {Array.from({ length: offset }, (_, index) => (
              <div
                className="calendar-cell empty-cell"
                key={`empty-${index}`}
              />
            ))}

            {Array.from({ length: days }, (_, index) => {
              const day = index + 1;
              const cellDate = new Date(year, monthIndex, day);
              const isSelected =
                dateKey(cellDate) === dateKey(selectedDate);
              const isToday = dateKey(cellDate) === dateKey(today);
              const hasEvents = Boolean(events[dateKey(cellDate)]);

              return (
                <button
                  key={day}
                  className={`calendar-cell ${
                    isSelected ? "day-selected" : ""
                  } ${isToday ? "day-today" : ""}`}
                  onClick={() => setSelectedDate(cellDate)}
                  aria-pressed={isSelected}
                  aria-label={`${cellDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}${hasEvents ? ", has scheduled activities" : ""}`}
                >
                  <span>{day}</span>
                  {hasEvents && <i className="event-dot" />}
                </button>
              );
            })}
          </div>
        </section>

        <section className="panel agenda-panel">
          <div className="panel-heading">
            <div>
              <h2>
                {selectedDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </h2>
              <p>Scheduled activities</p>
            </div>
          </div>

          {selectedEvents?.length ? (
            selectedEvents.map((event) => (
              <div className="agenda-event" key={event}>
                <span className="agenda-dot" />
                <span>{event}</span>
              </div>
            ))
          ) : (
            <p className="empty-state">
              No scheduled calls for this day.
            </p>
          )}
        </section>
      </div>
    </>
  );
}


function PulsePage() {
  const [channel, setChannel] = useState("general");
  const [message, setMessage] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);

  const [sentMessages, setSentMessages] = useState<
    { channel: string; text: string }[]
  >([]);

  const initialMessages: Record<
    string,
    {
      name: string;
      initials: string;
      text: string;
      time: string;
    }[]
  > = {
    general: [
      {
        name: "Ananya",
        initials: "AN",
        text: "Good morning team! Let's keep the momentum going today.",
        time: "9:12 AM",
      },
      {
        name: "Vikram",
        initials: "VK",
        text: "Yesterday's follow-up campaign went really well. Great work everyone.",
        time: "9:18 AM",
      },
      {
        name: "You",
        initials: "PR",
        text: "Agreed! I'll be focusing on the high-intent leads this morning.",
        time: "9:24 AM",
      },
    ],
    sales: [
      {
        name: "Ananya",
        initials: "AN",
        text: "Please share updates on your priority leads here.",
        time: "9:05 AM",
      },
    ],
    support: [
      {
        name: "Vikram",
        initials: "VK",
        text: "Post any questions or blockers in this channel.",
        time: "8:55 AM",
      },
    ],
  };

  const messages = [
    ...(initialMessages[channel] ?? []),
    ...sentMessages
      .filter((item) => item.channel === channel)
      .map((item) => ({
        name: "You",
        initials: "PR",
        text: item.text,
        time: "Just now",
      })),
  ];

  function sendMessage() {
    const trimmed = message.trim();
    if (!trimmed) return;

    setSentMessages((previous) => [
      ...previous,
      { channel, text: trimmed },
    ]);
    setMessage("");
  }

  function shareSuggestion() {
    setMessage(
      "I recommend prioritising a personalised follow-up call for high-intent leads."
    );
  }

  function acknowledge() {
    setAcknowledged(true);

    setSentMessages((previous) => [
      ...previous,
      {
        channel,
        text: "I have reviewed the pinned follow-up strategy.",
      },
    ]);

    setMessage("");
  }

  return (
    <>
      <div className="page-title-row">
        <div>
          <div className="eyebrow">TEAM COLLABORATION</div>
          <h1>Pulse</h1>
          <p className="subtitle">
            Conversations, updates and team decisions in one place.
          </p>
        </div>
      </div>

      <div className="pulse-layout">
        <aside className="panel channel-panel">
          <div className="panel-heading">
            <div>
              <h2>Channels</h2>
              <p>Your team spaces</p>
            </div>
          </div>

          {[
            { id: "general", label: "general" },
            { id: "sales", label: "sales" },
            { id: "support", label: "support" },
          ].map((item) => (
            <button
              key={item.id}
              className={`channel-button ${
                channel === item.id ? "channel-active" : ""
              }`}
              onClick={() => setChannel(item.id)}
            >
              <MessageSquare size={17} /> # {item.label}
            </button>
          ))}
        </aside>

        <section className="panel chat-panel">
          <div className="chat-heading">
            <div>
              <h2># {channel}</h2>
              <p>Team conversation</p>
            </div>
            <span className="online-label">
              <i /> Team online
            </span>
          </div>

          <div className="pinned-card">
            <div className="pinned-heading">
              <span>
                📌 PINNED ·{" "}
                {acknowledged ? "ACKNOWLEDGED" : "NEEDS YOUR INPUT"}
              </span>

              <span
                className={`status-pill ${
                  acknowledged ? "status-success" : "status-warm"
                }`}
              >
                {acknowledged ? "Acknowledged" : "Action needed"}
              </span>
            </div>

            <h3>Follow-up strategy for high-intent leads</h3>

            <p>
              Can we align on the best next step for leads who have
              revisited the pricing page? Share your suggestion.
            </p>

            <div className="pinned-actions">
              <button
                className="primary-button"
                onClick={shareSuggestion}
              >
                Share suggestion
              </button>

              <button
                className="secondary-button"
                onClick={acknowledge}
                disabled={acknowledged}
              >
                {acknowledged ? "Acknowledged" : "Acknowledge"}
              </button>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((item, index) => (
              <div
                className={`chat-message ${
                  item.name === "You" ? "own-message" : ""
                }`}
                key={`${item.name}-${index}`}
              >
                <div className="chat-avatar">{item.initials}</div>

                <div className="chat-bubble-wrap">
                  <div className="chat-meta">
                    <strong>{item.name}</strong>
                    <span>{item.time}</span>
                  </div>

                  <div className="chat-bubble">{item.text}</div>
                </div>
              </div>
            ))}
          </div>

          <form
            className="chat-composer"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={`Message #${channel}...`}
              aria-label="Message"
            />

            <button
              className="primary-button"
              type="submit"
              disabled={!message.trim()}
            >
              Send <ChevronRight size={16} />
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

export default App;
