import React, { useMemo, useState } from 'react'

const UseMemoComponent = () => {
  const [inputValue, setInputValue] = useState('');

  const calculateResult = (input) => {
    console.log("calculating result...");
    return input.length * 100;
  }

  const memoizedResult = useMemo(()=> calculateResult(inputValue),[inputValue]);

  return (
    <div>
      <h1>Use Memo hook use cases</h1>
      <p>Memoise the function return value/result</p>
      <input type="text" value={inputValue} onChange={(e)=> setInputValue(e.target.value)} />
      <p>Memoized result: {memoizedResult}</p>
    </div>
  )
}

export default UseMemoComponent
