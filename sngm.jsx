import React, { useState, useMemo, useEffect } from "react";

export default function Sangam() {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [route, setRoute] = useState("dashboard");
  const [profile, setProfile] = useState({
    name: "A. Graduate",
    headline: "Frontend Engineer — React",
    skills: ["React", "JavaScript", "Node.js"],
    linkedin: "https://linkedin.com/in/sample",
    github: "https://github.com/sample",
  });

  const mockAlumni = useMemo(() => [
    { id: 1, name: "Priya S.", role: "Data Scientist", skills: ["Python", "ML"] },
    { id: 2, name: "Rohit K.", role: "Product Manager", skills: ["Product", "Roadmaps"] },
    { id: 3, name: "Anita R.", role: "DevOps Engineer", skills: ["AWS", "Kubernetes"] },
    { id: 4, name: "Sameer T.", role: "Frontend Engineer", skills: ["React", "TypeScript"] },
  ], []);

  const matches = useMemo(() => {
    const safeSkills = Array.isArray(profile.skills) ? profile.skills : String(profile.skills).split(",").map(s => s.trim()).filter(Boolean);
    const mySkills = new Set(safeSkills.map(s => String(s).toLowerCase()));
    return mockAlumni
      .map(a => ({
        ...a,
        score: (Array.isArray(a.skills) ? a.skills : []).reduce((acc, s) => acc + (mySkills.has(String(s).toLowerCase()) ? 1 : 0), 0),
      }))
      .sort((a, b) => b.score - a.score);
  }, [profile, mockAlumni]);

  if (!authenticated) {
    return (
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
        <h1 className="fs-3 fw-bold mb-4">Welcome to Sangam</h1>
        {!role ? (
          <div className="d-flex flex-column gap-2">
            <div className="fs-5 mb-2">Who are you?</div>
            {['Student', 'Admin', 'Alumni'].map(r => (
              <button key={r} onClick={() => setRole(r)} className="btn btn-primary px-4 py-2">{r}</button>
            ))}
          </div>
        ) : (
          <div className="d-flex flex-column gap-2 align-items-center">
            <div className="fs-5">You selected: <span className="fw-semibold">{role}</span></div>
            <div className="mt-4 w-100" style={{ maxWidth: '300px' }}>
              <input type="text" placeholder="Enter demo username" className="form-control mb-2" />
              <input type="password" placeholder="Enter demo password" className="form-control mb-2" />
              <button onClick={() => setAuthenticated(true)} className="mt-2 w-100 btn btn-success px-6 py-2">Login</button>
            </div>
            <button onClick={() => setRole(null)} className="mt-2 btn btn-outline-secondary px-6 py-2">Back</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light text-dark">
      <header className="bg-white shadow-sm sticky-top" style={{ zIndex: 10 }}>
        <div className="container-lg mx-auto px-4 py-4 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <div className="fs-4 fw-bold">Sangam</div>
            <div className="text-muted small">(Prototype)</div>
          </div>
          <nav className="d-flex gap-2">
            <NavButton label="Dashboard" active={route === "dashboard"} onClick={() => setRoute("dashboard")} />
            <NavButton label="Network" active={route === "network"} onClick={() => setRoute("network")} />
            <NavButton label="Jobs" active={route === "jobs"} onClick={() => setRoute("jobs")} />
            <NavButton label="Learn (LEAD)" active={route === "learn"} onClick={() => setRoute("learn")} />
            <NavButton label="Mentors (CEM)" active={route === "mentors"} onClick={() => setRoute("mentors")} />
            <NavButton label="Events" active={route === "events"} onClick={() => setRoute("events")} />
            <NavButton label="Chat" active={route === "chat"} onClick={() => setRoute("chat")} />
            <NavButton label="Donate" active={route === "donate"} onClick={() => setRoute("donate")} />
          </nav>
        </div>
      </header>

      <main className="container-lg mx-auto p-4">
        <div className="row g-4">
          <aside className="col-lg-3">
            <div className="bg-white p-4 rounded-3 shadow-sm">
              <ProfileCard profile={profile} onEdit={setProfile} />
              <QuickStats />
            </div>
          </aside>

          <section className="col-lg-9">
            {route === "dashboard" && <Dashboard profile={profile} matches={matches} />}
            {route === "chat" && <ChatSection users={mockAlumni} />}
            {route === "events" && <EventManagement />}
          </section>
        </div>
      </main>

      <footer className="text-center small text-muted py-3">© {new Date().getFullYear()} Sangam — Prototype</footer>
    </div>
  );
}

function NavButton({ label, active, onClick }) {
  const baseClass = "btn btn-sm px-3 py-2";
  const activeClass = "btn-dark text-white"; // bg-slate-900 text-white
  const inactiveClass = "text-secondary"; // text-slate-600 hover:bg-slate-100

  return (
    <button onClick={onClick} className={`${baseClass} ${active ? activeClass : inactiveClass}`} type="button">{label}</button>
  );
}

function ProfileCard({ profile, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...profile });

  useEffect(() => { setForm({ ...profile }); }, [profile]);

  function save() {
    onEdit({ ...form });
    setEditing(false);
  }

  const initialLetter = profile.name?.[0] || "A";

  return (
    <div>
      <div className="d-flex align-items-center gap-3">
        <div 
          className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" 
          style={{ 
            height: '3.5rem', width: '3.5rem', 
            background: 'linear-gradient(to bottom right, #4c51bf, #ec4899)' // Simulate gradient
          }}
        >
          {initialLetter}
        </div>
        <div>
          <div className="fw-semibold">{profile.name}</div>
          <div className="small text-muted">{profile.headline}</div>
        </div>
      </div>
      {editing ? (
        <div className="mt-3">
          <input className="form-control mb-2" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input className="form-control mb-2" value={form.headline} onChange={e => setForm({ ...form, headline: e.target.value })} />
          <input className="form-control mb-2" value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })} />
          <input className="form-control mb-2" value={form.github} onChange={e => setForm({ ...form, github: e.target.value })} />
          <button onClick={save} className="mt-2 btn btn-success">Save</button>
        </div>
      ) : (
        <button onClick={() => setEditing(true)} className="mt-3 btn btn-primary">Edit Profile</button>
      )}
    </div>
  );
}

function QuickStats() {
  return (
    <div className="bg-light p-4 rounded text-center mt-3">
      <div className="small text-muted">Quick Stats Placeholder</div>
      <div className="fw-bold mt-2">Connections: 12 | Jobs Applied: 3</div>
    </div>
  );
}

function Dashboard({ profile, matches }) {
  return (
    <div>
      <h2 className="fs-5 fw-bold mb-4">Dashboard</h2>
      <div className="d-grid gap-4">
        {matches.map(m => (
          <div key={m.id} className="p-3 bg-white rounded shadow-sm border">
            <div className="fw-semibold">{m.name}</div>
            <div className="small text-muted">{m.role}</div>
            <div className="small mt-1 text-secondary">Skills: {m.skills.join(", ")}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatSection({ users }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedUser, setSelectedUser] = useState(users[0]?.id || null);
  const [discussion, setDiscussion] = useState([]);
  const [discussionInput, setDiscussionInput] = useState("");

  function sendMessage() {
    if (input.trim() && selectedUser) {
      setMessages([...messages, { id: Date.now(), text: input, to: selectedUser }]);
      setInput("");
    }
  }

  function addDiscussion() {
    if (discussionInput.trim()) {
      setDiscussion([...discussion, { id: Date.now(), text: discussionInput }]);
      setDiscussionInput("");
    }
  }

  return (
    <div className="bg-white p-4 rounded-3 shadow-sm d-flex flex-column gap-4">
      <h2 className="fs-5 fw-bold">Chat & Discussion</h2>
      <div className="row g-4">
        <div className="col-md-6">
          <h3 className="fw-semibold mb-2">Send Message</h3>
          <select value={selectedUser} onChange={e => setSelectedUser(Number(e.target.value))} className="form-select mb-2">
            {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
          <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type your message..." className="form-control mb-2" />
          <button onClick={sendMessage} className="btn btn-primary mb-2">Send</button>
          <div className="overflow-auto border rounded p-2 bg-light" style={{ height: '12rem' }}>
            {messages.filter(m => m.to === selectedUser).map(m => (
              <div key={m.id} className="mb-1 small"><strong>To {users.find(u => u.id === m.to)?.name}:</strong> {m.text}</div>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <h3 className="fw-semibold mb-2">Discussion</h3>
          <input value={discussionInput} onChange={e => setDiscussionInput(e.target.value)} placeholder="Add to discussion..." className="form-control mb-2" />
          <button onClick={addDiscussion} className="btn btn-success mb-2">Post</button>
          <div className="overflow-auto border rounded p-2 bg-light" style={{ height: '12rem' }}>
            {discussion.map(d => <div key={d.id} className="mb-1 small">{d.text}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function EventManagement() {
  return (
    <div className="bg-white p-4 rounded-3 shadow-sm">
      <h2 className="fs-5 fw-bold mb-4">Events</h2>
      <p>Event management section placeholder.</p>
    </div>
  );
}

export { Sangam };