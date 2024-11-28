import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { removeFromCart, updateQuantity, clearCart } from '../../store/cartSlice'
import { useSales } from '../../hooks/useSupabase'

const ShoppingCart: React.FC = () => {
  const { items, total } = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()
  const { createSale } = useSales()

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }))
    } else {
      dispatch(removeFromCart(id))
    }
  }

  const handleCheckout = async () => {
    const saleData = {
      total: total,
      payment_received: total,
      change_given: 0,
      payment_method: 'cash'
    }

    const sale = await createSale(saleData)
    if (sale) {
      // Verkaufsartikel speichern
      dispatch(clearCart())
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Warenkorb</h2>
      {items.length === 0 ? (
        <p className="text-gray-500">Ihr Warenkorb ist leer</p>
      ) : (
        <>
          {items.map(item => (
            <div key={item.id} className="flex justify-between items-center mb-2 pb-2 border-b">
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-gray-600">{item.price.toFixed(2)} €</p>
              </div>
              <div className="flex items-center">
                <button 
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  className="bg-gray-200 px-2 rounded"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="bg-gray-200 px-2 rounded"
                >
                  +
                </button>
              </div>
              <span className="font-semibold">{(item.price * item.quantity).toFixed(2)} €</span>
            </div>
          ))}
          <div className="mt-4">
            <div className="flex justify-between font-bold text-xl">
              <span>Gesamt:</span>
              <span>{total.toFixed(2)} €</span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full bg-green-500 text-white py-2 rounded mt-4 hover:bg-green-600 transition"
            >
              Kasse
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default ShoppingCart
