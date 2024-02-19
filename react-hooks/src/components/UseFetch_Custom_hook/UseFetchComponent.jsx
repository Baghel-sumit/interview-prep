import React from 'react'
import useFetch from './UseFetch'

const UseFetchComponent = () => {
  const { isLoading, data } = useFetch('https://jsonplaceholder.typicode.com/todos');

  console.log(data);

  return (
    <div>
      Hello from useFetch custom hook
      {isLoading && 'loading...'}
    </div>
  )
}

export default UseFetchComponent
