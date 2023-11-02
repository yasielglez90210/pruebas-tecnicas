import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import MyDialog from '../Dialog/index'

export default function CartDialog({ cart, setCart }) {
  return (
    <MyDialog
      show={cart}
      onClose={setCart}
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
            onClick={() => setCart(false)}
          >
            <span className="absolute -inset-0.5" />
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="border-t border-gray-200 px-4 py-6">...</div>
      </Dialog.Panel>
    </MyDialog>
  )
}
