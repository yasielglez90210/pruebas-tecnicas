import { useContext } from 'react'
import { CartContext } from '../context/cart'

export function useCart() {
  const { cart, addToCart, removeFromCart, cleanCart } = useContext(CartContext)

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId)
  }

  const handleCleanCart = () => cleanCart()

  const productInCart = (productId) => {
    const productInCart = cart.findIndex((item) => item.id === productId)
    if (productInCart !== -1) {
      return cart[productInCart].quantity
    }

    return 0
  }

  return {
    cart,
    handleAddToCart,
    handleRemoveFromCart,
    handleCleanCart,
    productInCart,
  }
}
