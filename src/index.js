import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './helpers/store'

import App from './App'
// const { store, persistor } = createStore()
const { store, persistor } = configureStore()

// const { store, persistor } = configureStore()
console.log(store)
ReactDOM.render(
  <Provider store={store}>
    // 2 props loading và persistor đều yêu cầu phải có
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
