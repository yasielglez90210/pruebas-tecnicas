import { createContext, useReducer } from 'react'
import { cartReducer, cartInitialState, CART_ACTIONS } from '../reducers/cart'

export const CartContext = createContext()

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)

  const addToCart = (product) => {
    dispatch({ type: CART_ACTIONS.ADD_TO_CART, payload: product })
  }

  const removeFromCart = (id) => {
    dispatch({ type: CART_ACTIONS.REMOVE_FROM_CART, payload: { id } })
  }

  const cleanCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAN_CART })
  }

  // Usando UseState

  // const [cart, setCart] = useState([])

  // const addToCart = (product) => {
  //   const productIndex = cart.findIndex((item) => item.id === product.id)

  //   if (productIndex >= 0) {
  //     const newCart = structuredClone(cart)
  //     newCart[productIndex].quantity += 1
  //     return setCart(newCart)
  //   }

  //   setCart((prevState) => [...prevState, { ...product, quantity: 1 }])
  // }

  // const removeFromCart = (productId) => {
  //   const productIndex = cart.findIndex((item) => item.id === productId)

  //   if (productIndex >= 0) {
  //     if (cart[productIndex].quantity > 1) {
  //       const newCart = structuredClone(cart)
  //       newCart[productIndex].quantity -= 1
  //       return setCart(newCart)
  //     } else {
  //       const newCart = structuredClone(cart)
  //       newCart.splice(productIndex, 1)
  //       return setCart(newCart)
  //     }
  //   }
  // }

  // const cleanCart = () => {
  //   setCart([])
  // }

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        cleanCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
