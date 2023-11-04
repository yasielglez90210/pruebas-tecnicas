import { useCart } from '../hooks/useCart'
import ProductItem from './ProductItem'

export default function Products({ products }) {
  const { handleAddToCart, handleRemoveFromCart, productInCart } = useCart()

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        {products.length === 0 ? (
          <h2 className="w-fit mx-auto px-32 text-center py-4 rounded shadow font-semibold">
            No products found
          </h2>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => {
              const quantityProductInCart = productInCart(product.id)

              return (
                <ProductItem
                  key={product.id}
                  quantityProductInCart={quantityProductInCart}
                  handleAddToCart={() => handleAddToCart(product)}
                  handleRemoveFromCart={() => handleRemoveFromCart(product.id)}
                  {...product}
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
