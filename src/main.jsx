import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { Toaster } from 'react-hot-toast'
import rootReducer from './reducers/index.js'


const store = configureStore({
  reducer: rootReducer,
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster
          toastOptions={
            {
              className:'',
              style: {
                // backgroundColor: '#01285F',
                backgroundColor: 'white',
                // color: 'white',
                color: 'black',
                marginTop: 70,
                // transform: translateX(70)
              }
            }
          }
        />
      </BrowserRouter>
    </Provider>
)
