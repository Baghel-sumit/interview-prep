import React, { useState } from 'react'
import MyContext from './MyContext';

const yojna = {
  money: 348934,
  rashan: true, 
  pension: 500
};

const MoneyState = (props) => {
  const [counter, setCounter] = useState(0);
  return (
    <MyContext.Provider value={{ yojna, counter, setCounter }}>
      {props.children}
    </MyContext.Provider>
  )
}

export default MoneyState
