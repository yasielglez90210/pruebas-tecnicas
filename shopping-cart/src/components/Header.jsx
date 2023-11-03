import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import CartDialog from './UI/Dialog/cartDialog'
import { useState } from 'react'
import { useCart } from '../hooks/useCart'

export default function Header() {
  const { cart } = useCart()
  const [cartDialog, setCartDialog] = useState(false)

  return (
    <header className="border-b border-gray-200 bg-white mb-16">
      <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="">
          <div className="flex h-16 items-center">
            {/* Logo */}
            <div className="ml-4 flex lg:ml-0">
              <h1 className="font-bold">Shopping Cart</h1>
            </div>

            <div className="ml-auto flex items-center">
              {/* Cart */}
              <div className="relative ml-2 mr-2 flow-root lg:ml-4">
                <div
                  onClick={() => setCartDialog(true)}
                  href="#"
                  className="group -m-2 flex cursor-pointer items-center p-2"
                >
                  <ShoppingBagIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="absolute left-[14px] top-0 rounded-full bg-indigo-600 px-1 text-[11px] font-medium text-white">
                    {cart.length}
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <CartDialog cartDialog={cartDialog} setCartDialog={setCartDialog} />
    </header>
  )
}
