import React, { useState } from 'react'

export default function SearchBar({ onSearch, recent = [], onRecentClick }) {
  const [input, setInput] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onSearch(input.trim())
      setInput('')
    }
  }

  return (
    <div className="search-card">
      <form onSubmit={submit} className="search-form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search city (e.g. London)"
          aria-label="City"
        />
        <button type="submit">Search</button>
      </form>

      {recent && recent.length > 0 && (
        <div className="recent">
          <h4>Recent</h4>
          <div className="recent-list">
            {recent.map((c) => (
              <button key={c} onClick={() => onRecentClick(c)} className="recent-item">{c}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
