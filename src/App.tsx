import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'

import POSDashboard from './components/POSDashboard/POSDashboard'
import ShoppingCart from './components/ShoppingCart/ShoppingCart'
import PaymentProcessor from './components/PaymentProcessor/PaymentProcessor'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100 flex">
          <div className="w-2/3 p-4">
            <POSDashboard />
          </div>
          <div className="w-1/3 p-4 space-y-4">
            <ShoppingCart />
            <PaymentProcessor />
          </div>
        </div>
      </Router>
    </Provider>
  )
}

export default App
