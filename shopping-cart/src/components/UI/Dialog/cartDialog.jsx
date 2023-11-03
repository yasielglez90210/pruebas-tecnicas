import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import MyDialog from '../Dialog/index'
import { useCart } from '../../../hooks/useCart'

export default function CartDialog({ cartDialog, setCartDialog }) {
  const { cart, handleAddToCart, handleRemoveFromCart, handleCleanCart } =
    useCart()

  return (
    <MyDialog
      show={cartDialog}
      onClose={setCartDialog}
      position="justify-end"
      enter="transition ease-in-out duration-300 transform"
      enterFrom="translate-x-full"
      enterTo="-translate-x-0"
      leave="transition ease-in-out duration-300 transform"
      leaveFrom="-translate-x-0"
      leaveTo="translate-x-full"
    >
      <Dialog.Panel className="relative flex w-full max-w-sm flex-col overflow-y-auto bg-white pb-12 shadow-xl">
        <div className="flex px-4 py-5">
          <button
            type="button"
            className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 outline-none"
            onClick={() => setCartDialog(false)}
          >
            <span className="absolute -inset-0.5" />
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="border-t border-gray-200 px-4 py-6">
          {cart.length === 0 ? (
            <h2 className="w-fit mx-auto px-20 text-center py-4 rounded shadow font-semibold">
              There are no products!
            </h2>
          ) : (
            <div className="grid grid-cols-1 gap-y-10 w-3/4 mx-auto">
              {cart.map((product) => (
                <div key={product.id} href={product.href} className="group">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-28 object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">
                    {product.title}
                  </h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    ${product.price}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex-initial w-fit">
                      <span>Qty: {product.quantity}</span>
                    </div>
                    <div className="flex-initial w-fit">
                      <button
                        onClick={() => handleRemoveFromCart(product.id)}
                        className="w-fit bg-red-500 p-1 px-3 rounded-lg text-white mr-3"
                      >
                        -
                      </button>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-fit bg-blue-500 p-1 px-3 rounded-lg text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <hr className="mt-10" />
                </div>
              ))}
            </div>
          )}

          {cart.length > 0 && (
            <div className="grid grid-cols-1 gap-y-10 w-3/4 mx-auto">
              <button
                onClick={() => handleCleanCart()}
                className="w-full mt-16 bg-red-500 p-1 px-3 rounded-lg text-white"
              >
                Clean Cart
              </button>
            </div>
          )}
        </div>
      </Dialog.Panel>
    </MyDialog>
  )
}
