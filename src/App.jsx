import { useMemo, useState } from 'react'

const starterStops = [
  { id: 1, city: 'New York', type: 'Arrival', budget: 120, booked: true },
  { id: 2, city: 'Boston', type: 'Food', budget: 75, booked: false },
  { id: 3, city: 'Chicago', type: 'Stay', budget: 210, booked: true },
]

const inspirationCards = [
  {
    title: 'Interactive Forms',
    detail: 'Add and manage trip stops with controlled inputs.',
  },
  {
    title: 'Derived Totals',
    detail: 'Calculate budget, bookings, and progress from state.',
  },
  {
    title: 'Responsive UI',
    detail: 'Use layout cards and mobile-friendly sections.',
  },
]

function App() {
  const [traveler, setTraveler] = useState('Kabita')
  const [destination, setDestination] = useState('Spring React Road Trip')
  const [stops, setStops] = useState(starterStops)
  const [city, setCity] = useState('')
  const [type, setType] = useState('Stay')
  const [budget, setBudget] = useState(100)
  const [note, setNote] = useState('Practice more reusable React components on the next page.')

  const totalBudget = useMemo(
    () => stops.reduce((sum, stop) => sum + stop.budget, 0),
    [stops],
  )

  const bookedCount = useMemo(
    () => stops.filter((stop) => stop.booked).length,
    [stops],
  )

  const bookingRate = useMemo(() => {
    if (stops.length === 0) {
      return 0
    }

    return Math.round((bookedCount / stops.length) * 100)
  }, [bookedCount, stops.length])

  const nextBudgetLabel = useMemo(() => {
    if (budget >= 200) {
      return 'Big spend'
    }

    if (budget >= 120) {
      return 'Balanced'
    }

    return 'Budget friendly'
  }, [budget])

  function handleAddStop(event) {
    event.preventDefault()

    const trimmedCity = city.trim()
    if (!trimmedCity) {
      return
    }

    setStops((currentStops) => [
      {
        id: crypto.randomUUID(),
        city: trimmedCity,
        type,
        budget,
        booked: false,
      },
      ...currentStops,
    ])
    setCity('')
    setType('Stay')
    setBudget(100)
  }

  function handleToggleBooked(stopId) {
    setStops((currentStops) =>
      currentStops.map((stop) =>
        stop.id === stopId ? { ...stop, booked: !stop.booked } : stop,
      ),
    )
  }

  return (
    <main className="trip-shell">
      <section className="hero-grid">
        <article className="hero-panel">
          <p className="eyebrow">React Trip Planner</p>
          <h1>Another fresh React project idea.</h1>
          <p className="hero-copy">
            This version feels like a mini travel dashboard with budget
            planning, trip stops, booking progress, and editable notes.
          </p>

          <div className="hero-stats">
            <div className="stat-chip">
              <span className="stat-value">{totalBudget}</span>
              <span className="stat-label">total budget</span>
            </div>
            <div className="stat-chip">
              <span className="stat-value">{bookingRate}%</span>
              <span className="stat-label">booked</span>
            </div>
          </div>
        </article>

        <aside className="profile-panel">
          <p className="mini-label">Planner Info</p>

          <label className="field-label" htmlFor="traveler">
            Traveler
          </label>
          <input
            id="traveler"
            className="text-input"
            value={traveler}
            onChange={(event) => setTraveler(event.target.value)}
          />

          <label className="field-label" htmlFor="destination">
            Trip title
          </label>
          <input
            id="destination"
            className="text-input"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
          />
        </aside>
      </section>

      <section className="inspiration-grid">
        {inspirationCards.map((card) => (
          <article key={card.title} className="info-card">
            <p className="mini-label">Practice Focus</p>
            <h2>{card.title}</h2>
            <p>{card.detail}</p>
          </article>
        ))}
      </section>

      <section className="content-grid">
        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="mini-label">Trip Builder</p>
              <h2>{destination}</h2>
            </div>
            <span className="badge">{traveler}</span>
          </div>

          <form className="planner-form" onSubmit={handleAddStop}>
            <input
              className="text-input"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder="Add a city or stop"
            />

            <div className="row-layout">
              <label className="field-group">
                <span>Category</span>
                <select
                  className="select-input"
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                >
                  <option value="Stay">Stay</option>
                  <option value="Food">Food</option>
                  <option value="Arrival">Arrival</option>
                  <option value="Activity">Activity</option>
                </select>
              </label>

              <label className="field-group">
                <span>Budget: ${budget}</span>
                <input
                  className="range-input"
                  type="range"
                  min="20"
                  max="300"
                  step="10"
                  value={budget}
                  onChange={(event) => setBudget(Number(event.target.value))}
                />
              </label>

              <button type="submit">Add stop</button>
            </div>
          </form>

          <ul className="stop-list">
            {stops.map((stop) => (
              <li key={stop.id} className="stop-card">
                <label className="stop-row">
                  <input
                    type="checkbox"
                    checked={stop.booked}
                    onChange={() => handleToggleBooked(stop.id)}
                  />

                  <div className="stop-copy">
                    <strong>{stop.city}</strong>
                    <p>
                      {stop.type} · ${stop.budget}
                    </p>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel accent-panel">
          <div className="panel-header">
            <div>
              <p className="mini-label">Trip Summary</p>
              <h2>Quick overview</h2>
            </div>
            <span className="badge warm-badge">{nextBudgetLabel}</span>
          </div>

          <div className="summary-stack">
            <article className="summary-card">
              <span className="summary-number">{stops.length}</span>
              <p>Total planned stops</p>
            </article>

            <article className="summary-card">
              <span className="summary-number">{bookedCount}</span>
              <p>Stops already booked</p>
            </article>
          </div>

          <label className="field-label" htmlFor="note">
            Planner note
          </label>
          <textarea
            id="note"
            className="text-area"
            rows="5"
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
        </article>
      </section>
    </main>
  )
}

export default App
