import { useMemo, useState } from 'react'

const conceptCards = [
  {
    title: 'State Management',
    description: 'Used useState to keep forms, counters, and UI feedback in sync.',
  },
  {
    title: 'Derived Data',
    description: 'Calculated totals and completion progress from live task data.',
  },
  {
    title: 'Event Handling',
    description: 'Practiced button clicks, form submit flows, and controlled inputs.',
  },
]

const initialPracticeItems = [
  { id: 1, text: 'Built a counter with increase and reset buttons', done: true },
  { id: 2, text: 'Practiced controlled inputs in a form', done: true },
  { id: 3, text: 'Rendered task cards using map()', done: true },
  { id: 4, text: 'Added one more custom React challenge', done: false },
]

const initialWins = [
  'I feel more confident with component structure.',
  'I can connect state to the UI much faster now.',
]

function App() {
  const [name, setName] = useState('Kabita')
  const [streak, setStreak] = useState(6)
  const [energy, setEnergy] = useState(8)
  const [practiceItems, setPracticeItems] = useState(initialPracticeItems)
  const [newTask, setNewTask] = useState('')
  const [wins, setWins] = useState(initialWins)
  const [winInput, setWinInput] = useState('')

  const completedCount = useMemo(
    () => practiceItems.filter((item) => item.done).length,
    [practiceItems],
  )

  const completionRate = useMemo(() => {
    if (practiceItems.length === 0) {
      return 0
    }

    return Math.round((completedCount / practiceItems.length) * 100)
  }, [completedCount, practiceItems.length])

  const moodLabel = useMemo(() => {
    if (energy >= 9) {
      return 'On fire'
    }

    if (energy >= 7) {
      return 'Locked in'
    }

    if (energy >= 5) {
      return 'Steady'
    }

    return 'Taking it step by step'
  }, [energy])

  function handleToggleTask(taskId) {
    setPracticeItems((currentItems) =>
      currentItems.map((item) =>
        item.id === taskId ? { ...item, done: !item.done } : item,
      ),
    )
  }

  function handleAddTask(event) {
    event.preventDefault()

    const trimmedTask = newTask.trim()
    if (!trimmedTask) {
      return
    }

    setPracticeItems((currentItems) => [
      ...currentItems,
      {
        id: crypto.randomUUID(),
        text: trimmedTask,
        done: false,
      },
    ])
    setNewTask('')
  }

  function handleAddWin(event) {
    event.preventDefault()

    const trimmedWin = winInput.trim()
    if (!trimmedWin) {
      return
    }

    setWins((currentWins) => [trimmedWin, ...currentWins])
    setWinInput('')
  }

  return (
    <main className="page-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Daily React Progress</p>
          <h1>I practiced React a lot today.</h1>
          <p className="hero-text">
            This page shows the kind of work I focused on today: state updates,
            controlled forms, lists, derived values, and interactive UI.
          </p>
        </div>

        <div className="hero-card">
          <p className="mini-label">Today&apos;s snapshot</p>
          <h2>{name}&apos;s React journal</h2>
          <div className="stats-row">
            <div>
              <span className="stat-value">{completionRate}%</span>
              <span className="stat-label">practice complete</span>
            </div>
            <div>
              <span className="stat-value">{streak} days</span>
              <span className="stat-label">learning streak</span>
            </div>
          </div>

          <label className="field-label" htmlFor="name">
            Your name
          </label>
          <input
            id="name"
            className="text-input"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
          />
        </div>
      </section>

      <section className="concept-grid">
        {conceptCards.map((card) => (
          <article key={card.title} className="concept-card">
            <p className="mini-label">Practice area</p>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <article className="panel panel-tall">
          <div className="panel-header">
            <div>
              <p className="mini-label">Checklist</p>
              <h2>What I practiced today</h2>
            </div>
            <span className="badge">
              {completedCount}/{practiceItems.length} done
            </span>
          </div>

          <form className="inline-form" onSubmit={handleAddTask}>
            <input
              className="text-input"
              value={newTask}
              onChange={(event) => setNewTask(event.target.value)}
              placeholder="Add another React practice task"
            />
            <button type="submit">Add</button>
          </form>

          <ul className="task-list">
            {practiceItems.map((item) => (
              <li key={item.id} className="task-item">
                <label>
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => handleToggleTask(item.id)}
                  />
                  <span className={item.done ? 'task-text done' : 'task-text'}>
                    {item.text}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel accent-panel">
          <div className="panel-header">
            <div>
              <p className="mini-label">Energy Meter</p>
              <h2>How today felt</h2>
            </div>
            <span className="badge">{moodLabel}</span>
          </div>

          <p className="panel-copy">
            A small example of controlled range input with instant UI updates.
          </p>

          <div className="energy-number">{energy}/10</div>

          <input
            className="range-input"
            type="range"
            min="1"
            max="10"
            value={energy}
            onChange={(event) => setEnergy(Number(event.target.value))}
          />

          <div className="button-row">
            <button type="button" onClick={() => setStreak((value) => value + 1)}>
              Increase streak
            </button>
            <button type="button" onClick={() => setStreak(1)}>
              Reset streak
            </button>
          </div>
        </article>

        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="mini-label">Reflections</p>
              <h2>My wins from today</h2>
            </div>
            <span className="badge">{wins.length} notes</span>
          </div>

          <form className="stack-form" onSubmit={handleAddWin}>
            <input
              className="text-input"
              value={winInput}
              onChange={(event) => setWinInput(event.target.value)}
              placeholder="Write one thing you learned"
            />
            <button type="submit">Save note</button>
          </form>

          <div className="wins-list">
            {wins.map((win) => (
              <article key={win} className="win-card">
                <p>{win}</p>
              </article>
            ))}
          </div>
        </article>
      </section>
    </main>
  )
}

export default App
