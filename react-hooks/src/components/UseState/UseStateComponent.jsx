import React, { useState } from 'react'

const UseStateComponent = () => {
  const [counter, setCounter] = useState(0);

  const increase = () => {
    setCounter((prev)=> prev + 1);
  }
  const decrease = () => {
    setCounter((prev)=> prev - 1);
  }

  return (
    <div>
      <h1>Use state hook use case</h1>
      <p>variables are immutable in react js, it was introduced in 16.8 api of react.js</p>
      <div>
        <span>Counter</span>
        :
        <span>{counter}</span>
      </div>
      <div>
        <button onClick={increase}>Increase</button>
        <button onClick={decrease}>Decrease</button>
      </div>
    </div>
  )
}

export default UseStateComponent
