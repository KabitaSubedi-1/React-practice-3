import { useMemo, useState } from 'react'

const focusTracks = [
  {
    title: 'Components',
    note: 'Break the interface into smaller reusable pieces.',
  },
  {
    title: 'Hooks',
    note: 'Use state and derived values to keep the UI reactive.',
  },
  {
    title: 'Styling',
    note: 'Practice layout, spacing, and polished visual hierarchy.',
  },
]

const starterSessions = [
  { id: 1, name: 'Build a reusable card component', minutes: 35, done: true },
  { id: 2, name: 'Practice form handling with useState', minutes: 25, done: true },
  { id: 3, name: 'Create a dynamic list with map()', minutes: 30, done: false },
]

function App() {
  const [studentName, setStudentName] = useState('Kabita')
  const [goal, setGoal] = useState('Finish two more mini React projects this week.')
  const [sessions, setSessions] = useState(starterSessions)
  const [sessionName, setSessionName] = useState('')
  const [minutes, setMinutes] = useState(20)
  const [selectedView, setSelectedView] = useState('Today')

  const totalMinutes = useMemo(
    () => sessions.reduce((sum, session) => sum + session.minutes, 0),
    [sessions],
  )

  const completedSessions = useMemo(
    () => sessions.filter((session) => session.done).length,
    [sessions],
  )

  const progressPercent = useMemo(() => {
    if (sessions.length === 0) {
      return 0
    }

    return Math.round((completedSessions / sessions.length) * 100)
  }, [completedSessions, sessions.length])

  const longestSession = useMemo(() => {
    if (sessions.length === 0) {
      return 0
    }

    return Math.max(...sessions.map((session) => session.minutes))
  }, [sessions])

  function handleAddSession(event) {
    event.preventDefault()

    const trimmedName = sessionName.trim()
    if (!trimmedName) {
      return
    }

    setSessions((currentSessions) => [
      {
        id: crypto.randomUUID(),
        name: trimmedName,
        minutes,
        done: false,
      },
      ...currentSessions,
    ])
    setSessionName('')
    setMinutes(20)
  }

  function handleToggleSession(sessionId) {
    setSessions((currentSessions) =>
      currentSessions.map((session) =>
        session.id === sessionId
          ? { ...session, done: !session.done }
          : session,
      ),
    )
  }

  return (
    <main className="study-board">
      <section className="hero-layout">
        <article className="hero-main">
          <p className="eyebrow">React Study Planner</p>
          <h1>Another React practice project for today.</h1>
          <p className="hero-copy">
            This version is built like a study dashboard with forms, derived
            statistics, toggles, and a cleaner multi-column layout.
          </p>

          <div className="view-switcher" aria-label="Dashboard views">
            {['Today', 'This Week', 'Next'].map((view) => (
              <button
                key={view}
                type="button"
                className={selectedView === view ? 'switch active' : 'switch'}
                onClick={() => setSelectedView(view)}
              >
                {view}
              </button>
            ))}
          </div>
        </article>

        <aside className="hero-side">
          <p className="mini-label">Profile</p>
          <label className="field-label" htmlFor="studentName">
            Learner name
          </label>
          <input
            id="studentName"
            className="text-input"
            value={studentName}
            onChange={(event) => setStudentName(event.target.value)}
          />

          <label className="field-label" htmlFor="goal">
            Current goal
          </label>
          <textarea
            id="goal"
            className="text-area"
            value={goal}
            onChange={(event) => setGoal(event.target.value)}
            rows="4"
          />
        </aside>
      </section>

      <section className="metrics-grid">
        <article className="metric-card">
          <p className="mini-label">Progress</p>
          <h2>{progressPercent}% complete</h2>
          <p>{completedSessions} sessions finished so far.</p>
        </article>

        <article className="metric-card">
          <p className="mini-label">Time Spent</p>
          <h2>{totalMinutes} mins</h2>
          <p>Total planned time across your React practice sessions.</p>
        </article>

        <article className="metric-card">
          <p className="mini-label">Best Focus Block</p>
          <h2>{longestSession} mins</h2>
          <p>Your longest deep-work session in this practice board.</p>
        </article>
      </section>

      <section className="content-grid">
        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="mini-label">Session Planner</p>
              <h2>{studentName}&apos;s React tasks</h2>
            </div>
            <span className="badge">{selectedView}</span>
          </div>

          <form className="planner-form" onSubmit={handleAddSession}>
            <input
              className="text-input"
              value={sessionName}
              onChange={(event) => setSessionName(event.target.value)}
              placeholder="Add a React study task"
            />

            <div className="form-row">
              <label className="slider-wrap">
                <span>Minutes: {minutes}</span>
                <input
                  className="range-input"
                  type="range"
                  min="10"
                  max="90"
                  step="5"
                  value={minutes}
                  onChange={(event) => setMinutes(Number(event.target.value))}
                />
              </label>
              <button type="submit">Create session</button>
            </div>
          </form>

          <ul className="session-list">
            {sessions.map((session) => (
              <li key={session.id} className="session-card">
                <label className="session-check">
                  <input
                    type="checkbox"
                    checked={session.done}
                    onChange={() => handleToggleSession(session.id)}
                  />
                  <div>
                    <strong>{session.name}</strong>
                    <p>{session.minutes} minute focus block</p>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel accent-panel">
          <div className="panel-header">
            <div>
              <p className="mini-label">Learning Tracks</p>
              <h2>What this app practices</h2>
            </div>
            <span className="badge soft-badge">React UI</span>
          </div>

          <div className="track-list">
            {focusTracks.map((track) => (
              <article key={track.title} className="track-card">
                <h3>{track.title}</h3>
                <p>{track.note}</p>
              </article>
            ))}
          </div>

          <div className="goal-card">
            <p className="mini-label">Current note</p>
            <p>{goal}</p>
          </div>
        </article>
      </section>
    </main>
  )
}

export default App
