import { useMemo, useState } from 'react'

const starterTopics = [
  'Build a movie search with a public API',
  'Add dark mode with a toggle and saved preference',
  'Practice forms with validation and error messages',
  'Create a small shopping cart with totals',
]

const initialTasks = [
  { id: 1, text: 'Review React components', done: true },
  { id: 2, text: 'Practice useState', done: false },
  { id: 3, text: 'Build one mini project this week', done: false },
]

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('Kabita')
  const [color, setColor] = useState('#ff7a59')
  const [taskInput, setTaskInput] = useState('')
  const [tasks, setTasks] = useState(initialTasks)

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.done).length,
    [tasks],
  )

  const progressLabel = `${completedTasks}/${tasks.length || 0} tasks done`

  function handleAddTask(event) {
    event.preventDefault()

    const trimmedTask = taskInput.trim()
    if (!trimmedTask) {
      return
    }

    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: crypto.randomUUID(),
        text: trimmedTask,
        done: false,
      },
    ])
    setTaskInput('')
  }

  function handleToggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task,
      ),
    )
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">React Practice Repo</p>
          <h1>Learn React by building small pieces every day.</h1>
          <p className="hero-copy">
            This starter project gives you a few core patterns to practice:
            state, events, lists, forms, derived values, and reusable UI.
          </p>
        </div>

        <div className="hero-card">
          <p className="card-label">Current focus</p>
          <h2>{name}&apos;s React board</h2>
          <p>{progressLabel}</p>

          <label className="field-label" htmlFor="name">
            Update your name
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

      <section className="grid-layout">
        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="card-label">useState practice</p>
              <h2>Counter challenge</h2>
            </div>
            <span className="badge">Count: {count}</span>
          </div>

          <p className="panel-copy">
            Try changing the button logic, add a reset rule, or prevent the
            number from going below zero.
          </p>

          <div className="counter-value">{count}</div>

          <div className="button-row">
            <button type="button" onClick={() => setCount((value) => value - 1)}>
              Decrease
            </button>
            <button type="button" onClick={() => setCount(0)}>
              Reset
            </button>
            <button type="button" onClick={() => setCount((value) => value + 1)}>
              Increase
            </button>
          </div>
        </article>

        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="card-label">Forms + lists</p>
              <h2>Practice task tracker</h2>
            </div>
            <span className="badge">{progressLabel}</span>
          </div>

          <form className="task-form" onSubmit={handleAddTask}>
            <input
              className="text-input"
              value={taskInput}
              onChange={(event) => setTaskInput(event.target.value)}
              placeholder="Add a new practice task"
            />
            <button type="submit">Add task</button>
          </form>

          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className="task-item">
                <label>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => handleToggleTask(task.id)}
                  />
                  <span className={task.done ? 'task-text done' : 'task-text'}>
                    {task.text}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel accent-panel">
          <div className="panel-header">
            <div>
              <p className="card-label">Interactive styles</p>
              <h2>Color picker</h2>
            </div>
            <span className="badge">Live preview</span>
          </div>

          <p className="panel-copy">
            Use this to practice controlled inputs and dynamic styling.
          </p>

          <div className="color-card" style={{ backgroundColor: color }}>
            <p>Favorite UI color</p>
            <strong>{color}</strong>
          </div>

          <label className="field-label" htmlFor="color">
            Pick a color
          </label>
          <input
            id="color"
            className="color-input"
            type="color"
            value={color}
            onChange={(event) => setColor(event.target.value)}
          />
        </article>
      </section>

      <section className="ideas-section">
        <div className="section-heading">
          <p className="eyebrow">Next steps</p>
          <h2>Mini project ideas for practice</h2>
        </div>

        <div className="ideas-grid">
          {starterTopics.map((topic) => (
            <article key={topic} className="idea-card">
              <h3>{topic}</h3>
              <p>Use this starter repo and build the feature in a new component.</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
