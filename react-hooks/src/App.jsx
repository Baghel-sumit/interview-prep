import React from 'react'
import UseStateComponent from './components/UseState/UseStateComponent'
import UseReducerComponent from './components/UseReducer/UseReducerComponent'
import UseEffectComponet from './components/UseEffect/UseEffectComponet'
import UseRefComponent from './components/UseRef/UseRefComponent'
import IndianGovernment from './components/UseContext/indianGovernment'
import MoneyState from './components/UseContext/context/MoneyState'
import UseLayoutComponent from './components/UseLayoutEffect/UseLayoutComponent'
import UseCallBackComponent from './components/UseCallBack/UseCallBackComponent'
import UseMemoComponent from './components/UseMemo/UseMemoComponent'
import UseFetchComponent from './components/UseFetch_Custom_hook/UseFetchComponent'

const App = () => {
  return (
    <div>
      <UseStateComponent />
      <UseReducerComponent />
      <UseEffectComponet />
      <UseRefComponent />
      <h1>Use Context hook use case</h1>
      <p>Global state management</p>
      <MoneyState>
        <IndianGovernment />
      </MoneyState>
      <UseLayoutComponent />
      <UseCallBackComponent />
      <UseMemoComponent />
      <UseFetchComponent />
    </div>
  )
}

export default App
