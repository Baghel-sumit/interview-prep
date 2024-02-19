import React, { useEffect } from 'react'

const ChildComponent = ({ handleClick }) => {

  useEffect(()=> {
    console.log('UserEffect is running');
  },[handleClick])

  return (
    <div>
      <button onClick={handleClick}>Handle click</button>
    </div>
  )
}

export default ChildComponent
