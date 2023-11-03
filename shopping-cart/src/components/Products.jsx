import { useCart } from '../hooks/useCart'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

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
                <div key={product.id} href={product.href} className="group">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-48 object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">
                    {product.title}
                  </h3>
                  <p className="mt-1 text-lg font-medium text-gray-900 flex justify-between">
                    ${product.price}
                    {quantityProductInCart > 0 && (
                      <small className="font-normal">
                        Qty: {quantityProductInCart}
                      </small>
                    )}
                  </p>
                  <div className="flex items-center justify-between gap-4">
                    {quantityProductInCart > 0 && (
                      <button
                        onClick={() => handleRemoveFromCart(product.id)}
                        className="mt-2 p-1 rounded-lg text-white bg-red-500 w-1/2"
                      >
                        Remove -
                      </button>
                    )}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={classNames(
                        quantityProductInCart === 0 ? 'w-full' : 'w-1/2',
                        'mt-2 p-1 rounded-lg text-white bg-blue-500'
                      )}
                    >
                      Add +
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
