import React, { useState } from 'react'

const Counter = () => {
  const [count, setCount] = useState(0)

  return (
    <div
      style={{
        padding: '16px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        margin: '16px',
        maxWidth: '200px',
        maxHeight: '200px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h4>Contador con React</h4>
      <p>Cuenta: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        style={{
          padding: '8px 16px',
          background: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Incrementar
      </button>
      <button
        onClick={() => setCount(count - 1)}
        style={{
          padding: '8px 16px',
          marginLeft: '8px',
          background: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Decrementar
      </button>
    </div>
  )
}

export default Counter
