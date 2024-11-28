import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { clearCart } from '../../store/cartSlice'
import { useSales } from '../../hooks/useSupabase'

const PaymentProcessor: React.FC = () => {
  const { total } = useSelector((state: RootState) => state.cart)
  const [paymentReceived, setPaymentReceived] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const dispatch = useDispatch()
  const { createSale } = useSales()

  const predefinedAmounts = [5, 10, 20, 25, 30, 50]

  const changeAmount = Math.max(paymentReceived - total, 0)

  const handlePaymentSubmit = async () => {
    if (paymentReceived < total) {
      alert('Zahlungsbetrag zu niedrig')
      return
    }

    const saleData = {
      total: total,
      payment_received: paymentReceived,
      change_given: changeAmount,
      payment_method: paymentMethod
    }

    const sale = await createSale(saleData)
    if (sale) {
      dispatch(clearCart())
      setPaymentReceived(0)
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Zahlung</h2>
      
      <div className="mb-4">
        <label className="block mb-2">Zahlungsmethode</label>
        <select 
          value={paymentMethod} 
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="cash">Bargeld</option>
          <option value="card">Kartenzahlung</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Zu zahlender Betrag</label>
        <input 
          type="number" 
          value={total.toFixed(2)} 
          readOnly 
          className="w-full p-2 border rounded bg-gray-100"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Erhaltener Betrag</label>
        <input 
          type="number" 
          value={paymentReceived || ''} 
          onChange={(e) => setPaymentReceived(parseFloat(e.target.value))}
          className="w-full p-2 border rounded"
          placeholder="Zahlungsbetrag eingeben"
        />
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {predefinedAmounts.map(amount => (
          <button
            key={amount}
            onClick={() => setPaymentReceived(total + amount)}
            className="bg-blue-100 p-2 rounded hover:bg-blue-200"
          >
            + {amount} €
          </button>
        ))}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Rückgeld</label>
        <input 
          type="number" 
          value={changeAmount.toFixed(2)} 
          readOnly 
          className="w-full p-2 border rounded bg-gray-100"
        />
      </div>

      <button 
        onClick={handlePaymentSubmit}
        disabled={paymentReceived < total}
        className={`w-full py-2 rounded ${
          paymentReceived >= total 
            ? 'bg-green-500 text-white hover:bg-green-600' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Zahlung abschließen
      </button>
    </div>
  )
}

export default PaymentProcessor
