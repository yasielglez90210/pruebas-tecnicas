export const CART_ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAN_CART: 'CLEAN_CART',
}

export const cartReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action

  switch (actionType) {
    case CART_ACTIONS.ADD_TO_CART: {
      const { id } = actionPayload
      const productIndex = state.findIndex((item) => item.id === id)

      if (productIndex >= 0) {
        const newState = structuredClone(state)
        newState[productIndex].quantity += 1
        return newState
      }

      const newState = [...state, { ...actionPayload, quantity: 1 }]
      return newState
    }

    case CART_ACTIONS.REMOVE_FROM_CART: {
      const { id } = actionPayload
      const productIndex = state.findIndex((item) => item.id === id)

      if (productIndex >= 0) {
        if (state[productIndex].quantity > 1) {
          const newState = structuredClone(state)
          newState[productIndex].quantity -= 1
          return newState
        } else {
          const newState = structuredClone(state)
          newState.splice(productIndex, 1)
          return newState
        }
      }
    }

    case CART_ACTIONS.CLEAN_CART: {
      return []
    }
  }

  return state
}
