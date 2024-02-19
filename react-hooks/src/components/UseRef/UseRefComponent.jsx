import React, { useRef } from 'react'

const UseRefComponent = () => {
  const inputRef = useRef(null);

  const inputFocus = () => {
    inputRef.current.focus();
    inputRef.current.value = 'sumit';
  }

  return (
    <div>
      <h1>Use Ref hook use case</h1>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', gap: '1rem' }}>
        <input type="text" ref={inputRef} height={26} />
        <button onClick={inputFocus}>Focus on input</button>
      </div>
    </div>
  )
}

export default UseRefComponent
