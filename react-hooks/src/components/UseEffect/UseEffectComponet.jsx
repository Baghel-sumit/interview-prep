import React, { useEffect, useState } from 'react'

// hits two times when using strict Mode of react js , which enables life cycle methods

const UseEffectComponet = () => {
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState([]);

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => setData(json))
  },[counter])

  const increase = () => {
    setCounter(prev => prev + 1);
  }

  return (
    <div>
      <h1>Use Effect hook use case</h1>
      <p>it helps to perform side effects like api calls and dom manipulations</p>
      <div>
        <span>Counter</span>
        :
        <span>{counter}</span>
      </div>
      <div>
        <button onClick={increase}>Increase</button>
      </div>
      {/* <div>
        {data.map((item)=> (
          <div key={item.id}>
            <p>{item.title}</p>
            <p>{item.body}</p>
          </div>
        ))}
      </div> */}
    </div>
  )
}

export default UseEffectComponet
