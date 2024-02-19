import React, { useCallback, useState } from 'react'
import ChildComponent from './ChildComponent';

const UseCallBackComponent = () => {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

  const handleClick = useCallback(()=> {
    setCounter1((prev)=> prev + 1);
  },[]);


  return (
    <div>
      <h1>Use call back hook use case</h1>
      <p>it is used to memoise function especially when passing function down to child components. It helps optimize performance by performing unecessary re-creation of functions during re-render.</p>
      <h4>Counter1 : {counter1}</h4>
      <h4>Counter2 : {counter2}</h4>
      <ChildComponent handleClick={handleClick} />
      <button onClick={()=> setCounter2(prev=> prev+1)}>Increase counter 2</button>
    </div>
  )
}

export default UseCallBackComponent
