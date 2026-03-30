import { useState } from 'react'
import './App.css'

const initialTasks = [
  { id: 1, title: 'Draft landing page copy', category: 'Design', done: false },
  { id: 2, title: 'Set up API integration notes', category: 'Backend', done: true },
  { id: 3, title: 'Review onboarding flow', category: 'Product', done: false },
]

const filters = ['All', 'Open', 'Done']

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('General')
  const [activeFilter, setActiveFilter] = useState('All')

  const openCount = tasks.filter((task) => !task.done).length
  const doneCount = tasks.length - openCount

  const visibleTasks = tasks.filter((task) => {
    if (activeFilter === 'Open') return !task.done
    if (activeFilter === 'Done') return task.done
    return true
  })

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    if (!trimmedTitle) return

    setTasks((currentTasks) => [
      {
        id: crypto.randomUUID(),
        title: trimmedTitle,
        category,
        done: false,
      },
      ...currentTasks,
    ])
    setTitle('')
    setCategory('General')
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task,
      ),
    )
  }

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <p className="eyebrow">React Project</p>
        <h1>Focus Board</h1>
        <p className="intro">
          A lightweight task dashboard built with React. Add work, track progress,
          and filter what matters right now.
        </p>

        <div className="stats-grid">
          <article>
            <span>Total Tasks</span>
            <strong>{tasks.length}</strong>
          </article>
          <article>
            <span>Open</span>
            <strong>{openCount}</strong>
          </article>
          <article>
            <span>Completed</span>
            <strong>{doneCount}</strong>
          </article>
        </div>
      </section>

      <section className="workspace-panel">
        <form className="composer" onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="task-title">Task title</label>
            <input
              id="task-title"
              type="text"
              placeholder="Ship project summary"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <div className="field-group">
            <label htmlFor="task-category">Category</label>
            <select
              id="task-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option>General</option>
              <option>Design</option>
              <option>Product</option>
              <option>Backend</option>
              <option>Frontend</option>
            </select>
          </div>

          <button className="primary-button" type="submit">
            Add task
          </button>
        </form>

        <div className="toolbar">
          <div className="filter-group" aria-label="Task filters">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={filter === activeFilter ? 'filter active' : 'filter'}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <p className="toolbar-note">{visibleTasks.length} items visible</p>
        </div>

        <div className="task-list">
          {visibleTasks.length === 0 ? (
            <div className="empty-state">
              <h2>No tasks here</h2>
              <p>Switch filters or add a new task to keep the board moving.</p>
            </div>
          ) : (
            visibleTasks.map((task) => (
              <article
                key={task.id}
                className={task.done ? 'task-card done' : 'task-card'}
              >
                <div>
                  <span className="task-category">{task.category}</span>
                  <h2>{task.title}</h2>
                </div>
                <button
                  type="button"
                  className="toggle-button"
                  onClick={() => toggleTask(task.id)}
                >
                  {task.done ? 'Mark open' : 'Mark done'}
                </button>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  )
}

export default App
