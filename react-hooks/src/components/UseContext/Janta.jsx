import React, { useContext } from 'react'
import MyContext from './context/MyContext'

const Janta = (props) => {
  const { yojna, counter, setCounter } = useContext(MyContext);

  return (
    <div>
      <h5>Money: ₹{yojna.money}</h5>
      <h5>Pension: ₹{yojna.pension}</h5>
      <h5>Rashan Milega: {yojna.rashan ? 'Milega': 'Nahi Milega'}</h5>
      <h4>counter: {counter}</h4>
      <button onClick={()=> setCounter(prev => prev +1)}>Increase counter</button>
      <button onClick={()=> setCounter(prev => prev - 1)}>Decrease counter</button>
    </div>
  )
}

export default Janta
