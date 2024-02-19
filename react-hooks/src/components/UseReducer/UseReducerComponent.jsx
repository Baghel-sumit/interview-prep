import React, { useReducer } from 'react'

const counterReducer = (state, action) => {
  switch(action.type){
    case "increment":
      return { ...state, counter: state.counter + 1 };
    case "decrement":
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
}

const UseReducerComponent = () => {
  const [state, dispatch] = useReducer(counterReducer, { counter: 0 });

  const increase = () => {
    dispatch({ type: 'increment' })
  }

  const decrease = () => {
    dispatch({ type: 'decrement' })
  }

  return (
    <div>
      <h1>Use Reducer hook use case</h1>
      <p>it works as same as like useState hook, but if you want to perform some complex operations we can use useReducer hook</p>
      <div>
        <span>Counter</span>
        :
        <span>{state.counter}</span>
      </div>
      <div>
        <button onClick={increase}>Increase</button>
        <button onClick={decrease}>Decrease</button>
      </div>
    </div>
  )
}

export default UseReducerComponent
