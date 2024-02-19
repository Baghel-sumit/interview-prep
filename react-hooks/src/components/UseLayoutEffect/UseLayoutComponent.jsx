import React, { useLayoutEffect, useState } from 'react'

const UseLayoutComponent = () => {
  const [bgColor, setBgColor] = useState('black');

  useLayoutEffect(()=> {
    document.body.style.backgroundColor = bgColor;
  },[bgColor])

  return (
    <section>
      <h1>Use Layout Effect</h1>
      <p>Use layout effect and useEffect both use to side effects but use layout effect runs before useEffect</p>
      <button onClick={()=> setBgColor('grey')}>Change background color</button>
    </section>
  )
}

export default UseLayoutComponent
